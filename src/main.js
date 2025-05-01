import Phaser from 'phaser';
import PreloadScene from './scenes/PreloadScene';
import GameScene from './scenes/GameScene';
import UIScene from './scenes/UIScene';

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 1000 }, debug: false }
  },
  scene: [PreloadScene, GameScene, UIScene],
  scale: {
    mode: Phaser.Scale.RESIZE,
    autocenter: Phaser.Scale.CENTER_BOTH
  }
};

const game = new Phaser.Game(config);

console.log(game);
