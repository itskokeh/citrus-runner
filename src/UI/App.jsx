// import { useState } from 'react';
// import './App.css';

// export default function App () {
//   const [isLandscape, setIsLandscape] = useState(false);
//   const [game, setGame] = useState(null);

//   const requestLandscape = async () => {
//     try {
//       if (!document.fullscreenElement) {
//         await document.documentElement.requestFullscreen();
//       }
//       if (screen.orientation?.lock) {
//         await screen.orientation.lock('landscape');
//         setIsLandscape(true);
//       }
//     } catch (err) {
//       console.warn('could not lock orientation:', err);
//     }
//   };

//   const returnToPortrait = async () => {
//     try {
//       if (screen.orientation?.unlock) {
//         await screen.orientation.unlock();
//         setIsLandscape(false);
//       }
//       if (document.fullscreenElement) {
//         await document.exitFullscreen();
//       }
//     } catch (err) {
//       console.warn('Error returning to portrait:', err);
//     }
//   };

//   return (
//     <div className='game-container'>
//       {!isLandscape
//         ? (<button onClick={requestLandscape}>Enter Game</button>)
//         : (<button onClick={returnToPortrait}>Exit to Home</button>)};
//       {/* <button onClick={requestLandscape}>Enter Fullscreen (Landscape)</button> */}
//       <p>Just checking to see if it appears in landscape mode</p>
//       {/* {Game Content} */}
//     </div>
//   );
// }

import { useState } from 'react';

function App () {
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [phaserGame, setPhaserGame] = useState(null);

  // Start game (fullscreen + landscape + load Phaser)
  const startGame = async () => {
    try {
      // 1. Enter fullscreen
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }

      // 2. Lock orientation (critical for mobile)
      if (screen.orientation?.lock) {
        await screen.orientation.lock('landscape');
      }

      // 3. Dynamically load Phaser game
      const { default: initGame } = await import('../main.js'); // Adjust path
      const gameInstance = initGame(); // Phaser mounts to #game-container
      setPhaserGame(gameInstance);
      setIsGameRunning(true);
    } catch (err) {
      console.error('Game startup failed:', err);
      // Fallback: Warn user or retry
    }
  };

  // Exit game (unlock orientation + destroy Phaser)
  const exitGame = async () => {
    try {
      // 1. Destroy Phaser instance
      if (phaserGame) {
        phaserGame.destroy(true);
        setPhaserGame(null);
      }

      // 2. Unlock orientation (back to portrait)
      if (screen.orientation?.unlock) {
        await screen.orientation.unlock();
      }

      // 3. Exit fullscreen (optional)
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }

      setIsGameRunning(false);
    } catch (err) {
      console.error('Exit failed:', err);
    }
  };

  return (
    <div className='app'>
      {!isGameRunning
        ? (
          <button onClick={startGame}>Enter Game (Landscape)</button>
          )
        : (
          <button onClick={exitGame}>Exit to Home</button>
          )}

      {/* Phaser will mount here */}
      <div id='game-container' />
    </div>
  );
}

export default App;
