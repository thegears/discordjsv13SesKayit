import Head from 'next/head';
import { useState , useEffect } from 'react';
import WaitBot from '../comps/WaitBot.js';
import GetUserId from '../comps/GetUserId.js';
import RecordScreen from '../comps/RecordScreen.js';
import Audio from '../comps/Audio.js';

export default function Home() {

  const [status,setStatus] = useState("waitBot");
  const [user,setUser] = useState("");

  async function checkBotLogined(){
    let a = await fetch("http://localhost:5555/checkBotLogined");
    a = await a.json();

    console.log(a);

    if(a.status) setStatus("getId");
  };

  useEffect(() => {
    checkBotLogined();
  },[]);

  return (
    <div className = "mainContainer" >
      <Head>
        <title>thegears Ses Kayıt</title>
      </Head>

      {(status == "waitBot") && <WaitBot/>}
      {(status == "getId") && <GetUserId setUser = {setUser} setStatus = {setStatus} />}
      {(status == "recordScreen" && <RecordScreen setStatus = {setStatus} /> )}
      {(status == "audio") && <Audio/>}

      <style jsx>{`
        .mainContainer {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};
