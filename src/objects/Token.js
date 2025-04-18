export default class Token {
  constructor (scene) {
    this.scene = scene
    const token = scene.tokens.create(800, Phaser.Math.Between(400, 550), 'token')
    token.setVelocityX(-200)
    token.setCollideWorldBounds(false)
    token.setImmovable(true)
  }
}
