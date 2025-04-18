import Player from '../objects/Player'
import Token from '../objects/Token'
import { spawnPowerup, applyPowerup } from '../utils/powerups'

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('GameScene')
  }

  create () {
    this.ground = this.physics.add.staticGroup()
    this.ground.create(400, 580, 'ground').setScale(2).refreshBody()

    this.player = new Player(this, 100, 500)
    this.tokens = this.physics.add.group()
    this.powerups = this.physics.add.group()

    this.tokenTimer = this.time.addEvent({ delay: 1000, callback: () => new Token(this), loop: true })
    this.powerupTimer = this.time.addEvent({ delay: 10000, callback: () => spawnPowerup(this), loop: true })

    this.physics.add.collider(this.player.sprite, this.ground)
    this.physics.add.overlap(this.player.sprite, this.tokens, (_, token) => {
      token.destroy()
      this.player.collectToken()
    })
    this.physics.add.overlap(this.player.sprite, this.powerups, (_, powerup) => {
      applyPowerup(this.player, powerup.texture.key)
      powerup.destroy()
    })
  }

  update (time, delta) {
    this.player.update()
  }
}
