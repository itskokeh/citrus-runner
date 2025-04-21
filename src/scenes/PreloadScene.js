export default class PreloadScene extends Phaser.Scene {
  constructor () {
    super('PreloadScene');
  }

  preload () {
    this.load.image('arena', '/arcade-arena.png');
    this.load.image('arena-floor', '/arcade-floor.png');
    this.load.image('arena-ground', '/arcade-floor-1.png');
    this.load.spritesheet('player', 'assets');
    this.load.image('token', 'assets');
    this.load.image('magnet', 'assets');
    this.load.image('double', 'assets');
    this.load.image('speed', 'assets');
    this.load.image('shield', 'assets');
  }

  create () {
    this.scene.start('GameScene');
    this.scene.start('UIscene');
  }
}
