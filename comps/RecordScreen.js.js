export default function RecordScreen({setStatus}){
	
	async function toggleRecord(){
		document.querySelector("div").innerHTML = "Kullanıcı sustuğunda kayıt bitecek.";
		
		let a = await fetch("http://localhost:5555/startRecord");
		a = await a.json();

		if(a.status) setTimeout(() => {
			setStatus("audio");
		},500);
	};

	return (
		<div>
			<button id = "recordButton" onClick = {() => {
				toggleRecord();
			}} >Kayıt</button>

			<style jsx>{`
				button{
					width: 25vw;
					height: 12vh;
					background: #111;
					border: 0.1vw solid white;
					color: white;
					font-size: 2vw;
					font-family: Impact;
				}
			`}</style>
		</div>
	);
};