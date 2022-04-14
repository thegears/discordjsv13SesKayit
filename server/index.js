const config = require("./config.json");
const express = require("express");
const app = new express();
const bodyParser = require("body-parser");
const {
	Client,
	MessageEmbed
} = require('discord.js');
const client = new Client({
	intents: 32767
});
client.login(config.token);
client.on("ready", async () => {
	console.log("Hazır");
});
const cors = require('cors');
const {
	joinVoiceChannel,
	EndBehaviorType
} = require('@discordjs/voice');
const {
	createWriteStream,
	writeFile
} = require('node:fs');
const {
	opus
} = require('prism-media');
const {
	pipeline
} = require('node:stream');

//EXPRESS SERVER AYARLAR
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(cors({
	origin: true,
	credentials: true
}));
//app.use(express.static(__dirname + "/out"))
//EXPRESS SERVER AYARLAR

app.get("/checkBotLogined", (req, res) => {
	res.status(200).send({
		status: (client.user) ? true : false
	});
});

let connection, userId;

app.post("/joinChannel", (req, res) => {
	let user = req.body.user;

	try {
		let voice = client.guilds.cache.get(config.guild).members.cache.get(user).voice;

		if (!voice.channelId) res.status(200).send({
			err: "Bu kullanıcı bir ses kanalında değil"
		})
		else {
			try {
				connection = joinVoiceChannel({
					channelId: voice.channelId,
					guildId: config.guild,
					adapterCreator: client.guilds.cache.get(config.guild).voiceAdapterCreator,
				});

				userId = user;

				res.status(200).send({
					status: true
				});
			} catch (err) {
				res.status(200).send({
					err: "Kanala giremedim"
				});
			};
		};
	} catch (err) {
		res.status(200).send({
			err: "Hatalı ID"
		});
	};

});

app.get("/startRecord", async (req, res) => {
	let opusStream = connection.receiver.subscribe(userId, {
		end: {
			behavior: EndBehaviorType.AfterSilence,
			duration : 500
		}
	});

	let oggStream = new opus.OggLogicalBitstream({
		opusHead: new opus.OpusHead({
	      channelCount: 2,
	      sampleRate: 48000,
	    }),
	    opusTags: new opus.OpusTags({
	      maxPackets: 10,
	    })
	});


	let filename = `./record.ogg`;

	let out = createWriteStream(filename);

	pipeline(opusStream, oggStream, out, (err) => {
		if(err){
			console.log(err.message);
		}else{
			console.log("Kaydedildi");
			res.status(200).send({
				status: true
			});
		};
	});
});

app.get("/stopRecord", (req, res) => {
	connection.receiver.subscriptions.get(userId).destroy();
	

	res.status(200).send();
});

app.get("/record.ogg",(req,res) => {
	res.sendFile(__dirname + "/record.ogg");
});

app.listen(5555);