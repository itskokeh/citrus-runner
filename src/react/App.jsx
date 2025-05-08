import { useState, useEffect } from 'react';
import './App.css';

export default function App () {
  const [isLandscape, setIsLandscape] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  }, []);

  const requestLandscape = async () => {
    try {
      // Always try fullscreen first
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen().catch(e => console.log('Fullscreen not supported:', e));
      }

      // Only try to lock orientation on mobile devices
      if (isMobile && screen.orientation?.lock) {
        await screen.orientation.lock('landscape').catch(e => console.log('Orientation lock not supported:', e));
      }

      setIsLandscape(true);
      await loadGame();
    } catch (err) {
      console.warn('Game startup failed:', err);
      // Fallback - just load the game anyway
      setIsLandscape(true);
      await loadGame();
    }
  };

  const returnToPortrait = async () => {
    try {
      if (isMobile && screen.orientation?.unlock) {
        await screen.orientation.unlock();
      }
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
      setIsLandscape(false);
    } catch (err) {
      console.warn('Error returning to portrait:', err);
    }
  };

  return (
    <div className='game-container'>
      {!isLandscape
        ? (
          <div className='landscape-prompt'>
            <button onClick={requestLandscape}>Enter Game</button>
            {isMobile && <p>Please play in landscape mode for best experience</p>}
          </div>
          )
        : (
          <button onClick={returnToPortrait}>Exit to Home</button>
          )}
    </div>
  );
}

async function loadGame () {
  try {
    const { default: initGame } = await import('../phaser/main.js');
    initGame();
    document.getElementById('root').style.display = 'none';
  } catch (err) {
    console.error('Failed to load game:', err);
  }
}
