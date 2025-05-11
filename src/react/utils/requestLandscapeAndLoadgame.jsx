export default async function requestLandscapeAndLoadGame () {
  const isTabletOrSmaller = window.innerWidth <= 768;

  try {
    if (isTabletOrSmaller) {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen().catch(e =>
          console.log('Fullscreen not supported:', e)
        );
      }

      // Lock orientation to landscape
      if (screen.orientation?.lock) {
        await screen.orientation.lock('landscape').catch(e =>
          console.log('Orientation lock not supported:', e)
        );
      }
    }
    const gameContainer = document.getElementById('game-container');
    gameContainer.style.display = 'block';

    // Load the Phaser game
    const { default: initGame } = await import('../../phaser/main.js');
    initGame();

    const reactRoot = document.getElementById('root');
    if (reactRoot) {
      reactRoot.style.display = 'none';
    }
  } catch (err) {
    console.warn('Game startup failed:', err);
    const gameContainer = document.getElementById('game-container');
    gameContainer.style.display = 'block';

    // Fallback: load the game anyway
    const { default: initGame } = await import('../../phaser/main.js');
    initGame();

    const reactRoot = document.getElementById('root');
    if (reactRoot) {
      reactRoot.style.display = 'none';
    }
  }
}
