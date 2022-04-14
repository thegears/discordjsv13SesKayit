import ReactAudioPlayer from 'react-audio-player';

export default function Audio(){
	return (
		<div>
			<ReactAudioPlayer
			  src="http://localhost:5555/record.ogg"
			  autoPlay
			  controls
			/>

			<style jsx>{`

			`}</style>
		</div>
	);
};