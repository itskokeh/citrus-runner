import Phaser from 'phaser';
import PreloadScene from './scenes/PreloadScene';
import GameScene from './scenes/GameScene';
import UIScene from './scenes/UIScene';

function getLandscapeSize () {
  return {
    width: Math.max(window.innerWidth, window.innerHeight),
    height: Math.min(window.innerWidth, window.innerHeight)
  };
}

const { width, height } = getLandscapeSize();

const config = {
  type: Phaser.AUTO,
  width,
  height,
  backgroundColor: '#87ceeb',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1000 },
      debug: false
    }
  },
  scene: [PreloadScene, GameScene, UIScene],
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'game-container',
    orientation: Phaser.Scale.LANDSCAPE
  }
};

const game = new Phaser.Game(config);

// Handle window resize/orientation change
window.addEventListener('resize', () => {
  const { width, height } = getLandscapeSize();
  game.scale.resize(width, height);
});
