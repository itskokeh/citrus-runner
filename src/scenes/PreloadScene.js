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
    this.load.image('crate', 'assets');
    this.load.image('spike', 'assets');
    this.load.image('flying-dynamite', '/flying-dynamite.webp');
    this.load.image('token', '/citrus-token.webp');
    this.load.image('magnet', 'assets');
    this.load.image('double', 'assets');
    this.load.image('speed', 'assets');
    this.load.image('shield', 'assets');
    this.load.spritesheet('player', 'assets');
    this.load.audio('backgroundMusic', '/Space track.mp3');
  }

  create () {
    this.scene.start('GameScene');
    this.scene.start('UIScene');
  }
}
