import './App.css';
import VideoScene from './VideoScene';

function App() {
  const iddle = 'https://streaming.ideologik.io/streaming?customer=smartdoc&sim=metaverse&video=sd_iddle.webm';
  const hello = 'https://streaming.ideologik.io/streaming?customer=smartdoc&sim=metaverse&video=sd_hello.webm';
  const waiting = 'https://streaming.ideologik.io/streaming?customer=smartdoc&sim=metaverse&video=sd_waiting.webm';
  const talkink = 'https://streaming.ideologik.io/streaming?customer=smartdoc&sim=metaverse&video=sd_talking.webm';
  const bye = 'https://streaming.ideologik.io/streaming?customer=smartdoc&sim=metaverse&video=sd_bye.webm';
  return <VideoScene videoUrl={hello} floorTextureUrl="./ajedrez.jpg" />;
}

export default App;
