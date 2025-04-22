import Player from '../objects/Player';
import { spawnToken } from '../objects/Token';
import { spawnPowerup, applyPowerup } from '../utils/powerups';
import { createObstacle } from '../objects/obstacles/obstacleFactory';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('GameScene');
  }

  create () {
    this.scene.launch('UIScene');

    this.bgIndex = 0;
    this.bgTextures = ['arena-1', 'arena-2', 'arena-3', 'arena-4'];

    this.background = this.add.image(
      0,
      0,
      this.bgTextures[this.bgIndex]
    ).setOrigin(0, 0).setDisplaySize(
      this.scale.width,
      this.scale.height
    );

    this.time.addEvent({
      delay: 20000,
      loop: true,
      callback: () => {
        this.bgIndex = (this.bgIndex + 1) % this.bgTextures.length;
        this.background.setTexture(this.bgTextures[this.bgIndex]);
      }
    });
    // this.background = this.add.tileSprite(
    //   0,
    //   0,
    //   this.scale.width,
    //   this.scale.height,
    //   'arena'
    // ).setOrigin(0, 0);
    // this.background2 = this.add.tileSprite(
    //   0,
    //   0,
    //   this.scale.width,
    //   this.scale.height,
    //   'arena-wall'
    // ).setOrigin(0, 0);
    // this.background3 = this.add.tileSprite(
    //   0,
    //   0,
    //   this.scale.width,
    //   this.scale.height,
    //   'arena-wall-top'
    // ).setOrigin(0, 0);
    // const bg = this.add.image(0, 0, 'arena').setOrigin(0, 0);
    // // Set game width and height
    // const { width, height } = this.scale;
    // // Get original image size
    // const bgWidth = bg.width;
    // const bgHeight = bg.height;
    // // Get original image size
    // const scaleX = width / bgWidth;
    // const scaleY = height / bgHeight;
    // // Use the larger scale to fully fit the screen (can crop)
    // const scale = Math.max(scaleX, scaleY);
    // bg.setScale(scale);
    // // Center the background if needed
    // bg.setPosition(width / 2, height / 2);
    // bg.setOrigin(0.5, 0.5);

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

    this.obstacles = this.physics.add.group();

    // Player logic
    this.player = new Player(this, 100, 400);
    this.input.on('pointerdown', () => {
      this.player.jump();
    });
    this.tokens = this.physics.add.group({
      allowGravity: false
    });
    this.powerups = this.physics.add.group();

    this.createTokenCluster();
    this.powerupTimer = this.time.addEvent({
      delay: 10000,
      callback: () => spawnPowerup(this),
      loop: true
    });
    this.time.addEvent({ delay: 3000, callback: this.spawnObstacle, callbackScope: this, loop: true });

    this.physics.add.collider(this.player.sprite, this.floorPhysics);
    this.physics.add.overlap(this.player.sprite, this.tokens, (_, token) => {
      token.destroy();
      this.player.collectToken();
    });
    this.physics.add.overlap(this.player.sprite, this.powerups, (_, powerup) => {
      applyPowerup(this.player, powerup.texture.key);
      powerup.destroy();
    });
    this.physics.add.overlap(this.player, this.obstacles, this.handleCollision, null, this);
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

  spawnObstacle () {
    const rand = Phaser.Math.Between(0, 3);
    const x = 800;
    const y = 300;

    switch (rand) {
      case 0:
        createObstacle('crate', this, x, y);
        break;
      case 1:
        createObstacle('spike', this, x, y - 20);
        break;
      case 2:
        createObstacle('flying-enemy', this, x, y - 10);
        break;
      case 3:
        createObstacle('group', this, x, y, { count: 4 });
        break;
    }
  }

  handleCollision (player, obstacle) {
    this.scene.restart();
  }

  update (time, delta) {
    this.player.update();

    // this.background.tilePositionX += 1;
    // this.background2.tilePositionX += 1;
    // this.background3.tilePositionX += 1;

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
