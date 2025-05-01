import Phaser from 'phaser';
import PreloadScene from './scenes/PreloadScene';
import GameScene from './scenes/GameScene';
import UIScene from './scenes/UIScene';

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#87ceeb',
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'game-container',
    width: window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight,
    height: window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1000 },
      debug: false
    }
  },
  scene: [PreloadScene, GameScene, UIScene],
};

const game = new Phaser.Game(config);

// Optional: resize dynamically on orientation change
window.addEventListener('resize', () => {
  game.scale.resize(
    window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight,
    window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth
  );
});

console.log(game);
