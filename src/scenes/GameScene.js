import Player from '../objects/Player';
import Token from '../objects/Token';
import { spawnPowerup, applyPowerup } from '../utils/powerups';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('GameScene');
  }

  create () {
    this.scene.launch('UIScene');

    const bg = this.add.image(0, 0, 'arena').setOrigin(0, 0);
    // Set game width and height
    const { width, height } = this.scale;
    // Get original image size
    const bgWidth = bg.width;
    const bgHeight = bg.height;
    // Get original image size
    const scaleX = width / bgWidth;
    const scaleY = height / bgHeight;
    // Use the larger scale to fully fit the screen (can crop)
    const scale = Math.max(scaleX, scaleY);
    bg.setScale(scale);
    // Center the background if needed
    bg.setPosition(width / 2, height / 2);
    bg.setOrigin(0.5, 0.5);

    // this.ground = this.physics.add.staticGroup();
    // this.ground.create(100, 280, 'ground').setScale(2).refreshBody();

    this.player = new Player(this, 100, 500);
    this.tokens = this.physics.add.group();
    this.powerups = this.physics.add.group();

    this.tokenTimer = this.time.addEvent({ delay: 1000, callback: () => new Token(this), loop: true });
    this.powerupTimer = this.time.addEvent({ delay: 10000, callback: () => spawnPowerup(this), loop: true });

    this.physics.add.collider(this.player.sprite, this.ground);
    this.physics.add.overlap(this.player.sprite, this.tokens, (_, token) => {
      token.destroy();
      this.player.collectToken();
    });
    this.physics.add.overlap(this.player.sprite, this.powerups, (_, powerup) => {
      applyPowerup(this.player, powerup.texture.key);
      powerup.destroy();
    });
  }

  update (time, delta) {
    this.player.update();
  }
}
