import './App.css';
import VideoScene from './VideoScene';

import { useEffect, useRef, useState } from 'react';

function App() {
  const videos: any = {
    hello: { url: 'https://streaming.ideologik.io/streaming?customer=smartdoc&sim=metaverse&video=sd_hello.webm', loop: false },
    iddle: { url: 'https://streaming.ideologik.io/streaming?customer=smartdoc&sim=metaverse&video=sd_iddle.webm', loop: true },
    waiting: { url: 'https://streaming.ideologik.io/streaming?customer=smartdoc&sim=metaverse&video=sd_waiting.webm', loop: true },
    talking: { url: 'https://streaming.ideologik.io/streaming?customer=smartdoc&sim=metaverse&video=sd_talking.webm', loop: true },
    bye: { url: 'https://streaming.ideologik.io/streaming?customer=smartdoc&sim=metaverse&video=sd_bye.webm', loop: false },
  };

  const helloAudios = [
    './audios/saludos/saludo_1.mp3',
    './audios/saludos/saludo_2.mp3',
    './audios/saludos/saludo_3.mp3',
    './audios/saludos/saludo_4.mp3',
    './audios/saludos/saludo_5.mp3'
  ];

  const diagnosticsAudios = [
    './audios/pedidos_diagnostico/pedido_1.mp3',
    './audios/pedidos_diagnostico/pedido_2.mp3',
    './audios/pedidos_diagnostico/pedido_3.mp3',
    './audios/pedidos_diagnostico/pedido_4.mp3',
    './audios/pedidos_diagnostico/pedido_5.mp3'
  ];

  const byeAudios = [
    './audios/despedidas/despedida_1.mp3',
    './audios/despedidas/despedida_2.mp3',
    './audios/despedidas/despedida_3.mp3',
    './audios/despedidas/despedida_4.mp3',
    './audios/despedidas/despedida_5.mp3'
  ];

  const [currentVideo, setCurrentVideo] = useState<any>(videos.hello);
  const audioRef = useRef<any>(new Audio());

  const changeVideo = (videoKey: string) => {
    setCurrentVideo(videos[videoKey]);
  };

  const playRandomAudio = (audios: string[]) => {
    const randomIndex = Math.floor(Math.random() * audios.length);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = audios[randomIndex];
      audioRef.current.addEventListener('loadeddata', function () {
        audioRef.current.play();
      });
    }

  };



  useEffect(() => {
    if (currentVideo.url === videos.hello.url) {
      playRandomAudio(helloAudios);
      setTimeout(() => {
        setCurrentVideo(videos.talking);
      }, 6000); // Asume que el video "hello" tiene una duración de 5 segundos.
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideo]);

  return (
    <div className="scene-container">
      <div className="button-container">
        <button onClick={() => {
          changeVideo('hello');
          playRandomAudio(helloAudios);
        }}>Hello</button>
        <button onClick={() => {
          changeVideo('iddle');
        }}>Iddle</button>
        <button onClick={() => {
          changeVideo('talking');
          playRandomAudio(diagnosticsAudios);
        }}>Talking</button>
        <button onClick={() => {
          changeVideo('waiting');
        }}>Waiting</button>
        <button onClick={() => {
          changeVideo('bye');
          playRandomAudio(byeAudios);
        }}>Bye</button>
      </div>
      <VideoScene videoUrl={currentVideo.url} loop={currentVideo.loop} floorTextureUrl="./ajedrez.jpg" />
    </div>
  );
}

export default App;
