export default function GetUserId({setUser , setStatus}){
	
	async function joinChannel(){
		let user = document.querySelector("#user").value;

		if(user == "" || !user) alert("Lütfen bir ID girin");
		else if(isNaN(user)) alert("Lütfen ID'yi sayı olarak girin.");
		else{
			let a = await fetch("http://localhost:5555/joinChannel",{
				method: "POST",
				headers: {
			      'Accept': 'application/json',
			      'Content-Type': 'application/json'
			    },
			    body: JSON.stringify({
			    	user
			    })
			});

			a = await a.json();

			if(a.status){
				setStatus("recordScreen");
				setUser(user);
			};
		};
	};

	return (
		<div>
			<input id = "user" placeholder = "Sesi kaydedilecek kişinin ID'si"/>

			<div className="break"></div>

			<button onClick = {() => {
				joinChannel();
			}} >Kanalına gir</button>

			<style jsx>{`
				div{
					display: flex;
					flex-wrap: wrap;
					justify-content: center;
					align-items: center;
				}

				input{
					margin-top: 2vh;
					width: 50vw;
					height: 10vh;
					text-align: center;
					background: #111;
					border: 1px solid white;
					font-size: 3vh;
					font-family: Impact;
					color: white;
				}

				button{
					margin-top: 2vh;
					width: 25vw;
					height: 5vh;
					background: #111;
					color: white;
					font-size: 2vh;
				}

				.break {
				  flex-basis: 100%;
				  height: 0;
				}
			`}</style>
		</div>
	);
};