export default class Player {
  constructor (scene, x, y) {
    this.scene = scene
    this.sprite = scene.physics.add.sprite(x, y, 'player').setCollideWorldBounds(true)
    this.cursors = scene.input.keyboard.createCursorKeys()
    this.score = 0
    scene.registry.set('score', 0)
  }

  collectToken () {
    this.score += this.doubleCoins ? 2 : 1
    this.scene.registry.set('score', this.score)
  }

  update () {
    if (this.cursors.up.isDown && this.sprite.body.touching.down) {
      this.sprite.setVelocityY(-500)
    }
  }
}
