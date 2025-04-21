import Player from '../objects/Player';
import { spawnToken } from '../objects/Token';
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

    // const floor = this.add.image(0, this.scale.height, 'arena-ground').setOrigin(0, 0);
    // // Align left and bottom
    // floor.setOrigin(0, 1);
    // // Scale it to fit width
    // floor.displayWidth = this.scale.width;
    // floor.setScale(floor.scaleX, 0.1);

    const floorHeight = 40;
    // Visual layer
    this.floorVisual = this.add.tileSprite(
      0,
      this.scale.height - floorHeight,
      this.scale.width,
      floorHeight,
      'arena-ground'
    ).setOrigin(0, 0);

    // Collision layer
    this.floorPhysics = this.physics.add.staticGroup();
    this.floorPhysics.create(
      this.scale.width / 2,
      this.scale.height - 20,
      'arena-ground'
    ).setScale(1, 0.2).refreshBody();

    this.player = new Player(this, 100, 500);
    this.tokens = this.physics.add.group({
      allowGravity: false
    });
    this.powerups = this.physics.add.group();

    // this.tokenTimer = this.time.addEvent({ delay: 1000, callback: () => new Token(this), loop: true });
    this.createTokenCluster();
    this.powerupTimer = this.time.addEvent({ delay: 10000, callback: () => spawnPowerup(this), loop: true });

    this.physics.add.collider(this.player.sprite, this.floorPhysics);
    this.physics.add.overlap(this.player.sprite, this.tokens, (_, token) => {
      token.destroy();
      this.player.collectToken();
    });
    this.physics.add.overlap(this.player.sprite, this.powerups, (_, powerup) => {
      applyPowerup(this.player, powerup.texture.key);
      powerup.destroy();
    });
  }

  createTokenCluster () {
    const clusterSize = Phaser.Math.Between(3, 6);
    let tokensSpawned = 0;

    const spawnClusterToken = () => {
      if (tokensSpawned < clusterSize) {
        spawnToken(this);
        tokensSpawned++;
        this.time.delayedCall(200, spawnClusterToken);
      } else {
        this.time.delayedCall(3000, () => this.createTokenCluster());
      }
    };
    spawnClusterToken();
  }

  update (time, delta) {
    this.player.update();

    // Scroll floor to the left to simulate motion
    this.floorVisual.tilePositionX += 4;
    // Move tokens and powerups left
    this.tokens.children.iterate(token => {
      if (!token) return;
      token.x -= 4;
      if (token.x < -token.width) {
        token.destroy();
      }
    });

    this.powerups.children.iterate(powerup => {
      powerup.x -= 4;
      if (powerup.x < -powerup.width) {
        powerup.destroy();
      }
    });
  }
}
