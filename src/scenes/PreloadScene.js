export default class PreloadScene extends Phaser.Scene {
  constructor () {
    super('PreloadScene')
  }

  preload () {
    this.load.image('player', 'assets')
    this.load.image('token', 'assets')
    this.load.image('ground', 'assets')
    this.load.image('magnet', 'assets')
    this.load.image('double', 'assets')
    this.load.image('speed', 'assets')
    this.load.image('shield', 'assets')
  }

  create () {
    this.scene.start('GameScene')
    this.scene.start('UIscene')
  }
}
