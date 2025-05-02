import { useState } from 'react';
import './App.css';

export default function App () {
  const [isLandscape, setIsLandscape] = useState(false);

  const requestLandscape = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
      if (screen.orientation?.lock) {
        await screen.orientation.lock('landscape');
        setIsLandscape(true);
      }
    } catch (err) {
      console.warn('could not lock orientation:', err);
    }
  };

  const returnToPortrait = async () => {
    try {
      if (screen.orientation?.unlock) {
        await screen.orientation.unlock();
        setIsLandscape(false);
      }
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn('Error returning to portrait:', err);
    }
  };

  return (
    <div className='game-container'>
      {!isLandscape
        ? (<button onClick={requestLandscape}>Enter Game</button>)
        : (<button onClick={returnToPortrait}>Exit to Home</button>)};
      {/* <button onClick={requestLandscape}>Enter Fullscreen (Landscape)</button> */}
      <p>Just checking to see if it appears in landscape mode</p>
      {/* {Game Content} */}
    </div>
  );
}
