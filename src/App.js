import './App.css';
import React, { useRef } from 'react';
import red_button from './media/red_button.avif'

function importAll(r) {
  return r.keys().map(r);
}

const sounds = importAll(require.context('./media/ref/', false, /\.mp3$/));

// console.log(sounds)

function AudioPlayer() {
  // const [currentI, setI] = useState(0)
  const audioRef = useRef(null);

  const playRandomSound = () => {
    const randomIndex = Math.floor(Math.random() * sounds.length);
    const randomSound = sounds[randomIndex];
    // const randomSound = sounds[currentI];
    // console.log('i : ', currentI)
    // setI(currentI + 1)

    if (audioRef.current) {
      audioRef.current.src = randomSound;
      audioRef.current.play();
    }
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  };

  return (
    <div>
      <button onClick={playRandomSound}>
        <img src={red_button} className="App-logo" alt="logo"></img>
      </button>
      <button onClick={stopSound}>🔇 Stop</button>
      <audio ref={audioRef} />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AudioPlayer />
      </header>
    </div>
  );
}

export default App;