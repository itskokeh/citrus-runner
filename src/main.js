import Phaser from 'phaser'
import PreloadScene from './scenes/PreloadScene'
import GameScene from './scenes/GameScene'
import UIScene from './scenes/UIScene'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#87ceeb',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 1000 }, debug: false }
  },
  scene: [PreloadScene, GameScene, UIScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autocenter: Phaser.Scale.CENTER_BOTH
  }
}

const game = new Phaser.Game(config)
