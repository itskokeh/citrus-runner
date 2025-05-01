import { useEffect } from 'react';
import './App.css';

export default function App () {
  const requestLandscape = async () => {
    try {
      if (screen.orientation?.lock) {
        await screen.orientation.lock('landscape').catch(e => console.warn(e));
      }
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen().catch(e => console.warn(e));
      }
    } catch (err) {
      console.warn('could not lock orientation:', err);
    }
  };

  useEffect(() => {
    requestLandscape();
  }, []);

  return (
    <div className='game-container'>
      <button onClick={requestLandscape}>Enter Fullscreen (Landscape)</button>
      <p>Just checking to see if it appears in landscape mode</p>
      {/* {Game Content} */}
    </div>
  );
}
