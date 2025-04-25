import './App.css';
import React, { useRef, useState } from 'react';
import red_button from './assets/red_button.avif'

const soundModules = import.meta.glob('./assets/ref/*.mp3', { eager: true });
const sounds = Object.values(soundModules).map((mod) => mod.default);

function AudioPlayer({ setRefPlayed, setCurrentPlaying }) {

  const audioRef = useRef(null);

  const playRandomSound = () => {
    const randomIndex = Math.floor(Math.random() * sounds.length);
    const randomSound = sounds[randomIndex];

    if (audioRef.current) {
      audioRef.current.src = randomSound;
      audioRef.current.play();
      setCurrentPlaying(randomIndex);
      setRefPlayed((prev) => {
        const newRefPlayed = [...prev];
        newRefPlayed[randomIndex] = true;
        return newRefPlayed;
      })
    }

  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setCurrentPlaying(null);
    }
  };

  const handleAudioEnded = () => {
    setCurrentPlaying(null);
  };

  return (
    <div className="audioplayer flex flex-col items-center justify-center h-screen">
      <button onClick={playRandomSound}>
        <img src={red_button} className="red_button h-[50%]" alt="red button"></img>
      </button>
      <button onClick={stopSound}>Stop</button>
      <audio ref={audioRef}  onEnded={handleAudioEnded}/>
    </div>
  );
}

function RefList({ refPlayed, currentPlaying }) {


  // console.log(refPlayed)

  return (
    <div className="ref-list flex flex-col p-5 md:h-screen w-[50%] overflow-y-auto">
      <h2 className='mx-auto'>Ref</h2>
      <ul className='text-gray-500'>
        {sounds.map((sound, index) => (
          <li key={index} className={` ${currentPlaying === index ? "text-white" : ""}`}>
            {index} - {refPlayed[index] ? sound.split('/').pop().replace(/\.mp3.*$/, '') : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {

  const [refPlayed, setRefPlayed] = useState(Array.from({ length: sounds.length - 1 }, () => false));
  const [currentPlaying, setCurrentPlaying] = useState(null);

  return (
    <>
      <div className="App">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <AudioPlayer setRefPlayed={setRefPlayed} setCurrentPlaying={setCurrentPlaying} />
          <RefList refPlayed={refPlayed} currentPlaying={currentPlaying} />
        </div>
      </div>
    </>
  );
}

export default App;