export default class PreloadScene extends Phaser.Scene {
  constructor () {
    super('PreloadScene');
  }

  preload () {
    this.load.image('arena-1', '/arcade-1.webp');
    this.load.image('arena-2', '/arcade-2.webp');
    this.load.image('arena-3', '/arcade-3.webp');
    this.load.image('arena-4', '/arcade-4.webp');
    this.load.image('arena-ground', '/arcade-floor-top-5.png');
    this.load.image('crate', '/obstacles/crate.webp');
    this.load.image('flying-dynamite', '/obstacles/flying-dynamite.webp');
    this.load.image('magnet', '/powerups/magnet.webp');
    this.load.image('double', 'assets');
    this.load.image('token', '/citrus-token.webp');
    this.load.spritesheet('player', 'assets');
<<<<<<< HEAD:src/scenes/PreloadScene.js
    // this.load.audio('backgroundMusic', '');
    // this.load.audio('jumpSound', '/audio/jump.wav');
=======
    // this.load.audio('backgroundMusic', '/Space track.mp3');
>>>>>>> revert-to-old-commit:src/phaser/scenes/PreloadScene.js
  }

  create () {
    this.scene.start('GameScene');
    this.scene.start('UIScene');
  }
}
