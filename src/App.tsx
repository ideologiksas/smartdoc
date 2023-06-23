import './App.css';
import VideoScene from './VideoScene';

import { useState } from 'react';

function App() {
  const videos: any = {
    iddle: 'https://streaming.ideologik.io/streaming?customer=smartdoc&sim=metaverse&video=sd_iddle.webm',
    hello: 'https://streaming.ideologik.io/streaming?customer=smartdoc&sim=metaverse&video=sd_hello.webm',
    waiting: 'https://streaming.ideologik.io/streaming?customer=smartdoc&sim=metaverse&video=sd_waiting.webm',
    talking: 'https://streaming.ideologik.io/streaming?customer=smartdoc&sim=metaverse&video=sd_talking.webm',
    bye: 'https://streaming.ideologik.io/streaming?customer=smartdoc&sim=metaverse&video=sd_bye.webm'
  };

  const [currentVideo, setCurrentVideo] = useState<string>(videos.iddle);

  const changeVideo = (videoKey: string) => {
    setCurrentVideo(videos[videoKey]);
  };

  return (
    <div className="scene-container">
      <div className="button-container">
        <button onClick={() => changeVideo('hello')}>Hello</button>
        <button onClick={() => changeVideo('iddle')}>Iddle</button>
        <button onClick={() => changeVideo('talking')}>Talking</button>
        <button onClick={() => changeVideo('waiting')}>Waiting</button>
        <button onClick={() => changeVideo('bye')}>Bye</button>
      </div>
      <VideoScene videoUrl={currentVideo} floorTextureUrl="./ajedrez.jpg" />
    </div>
  );
}

export default App;