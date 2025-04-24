import Player from '../objects/Player';
import { spawnToken } from '../objects/Token';
import { spawnPowerup, applyPowerup } from '../utils/powerups';
import { createObstacle } from '../objects/obstacles/obstacleFactory';
import SoundManager from '../utils/soundManager';
import { pauseVelocity, resumeVelocity } from '../utils/velocityManager';
// import { togglePause } from '../utils/pausePlay';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('GameScene');
    this.soundManager = null;
    this.isPaused = false;
    this.backgrounds = [];
    this.player = null;
    this.obstacles = [];
    this.tokens = [];
    this.powerups = [];
  }

  create () {
    // this.scene.launch('UIScene');

    // Background
    const { width, height } = this.scale;
    this.bgTextures = ['arena-1', 'arena-2', 'arena-3', 'arena-4'];
    this.bgIndex = 0;
    this.bgSpeed = 2;

    this.backgrounds = [];

    for (let i = 0; i < this.bgTextures.length; i++) {
      const bg = this.add.image(
        i * width, 0, this.bgTextures[i]
      ).setOrigin(
        0, 0
      ).setDisplaySize(width, height);
      this.backgrounds.push(bg);
    }

    // const floorHeight = 40;
    // // Visual layer
    // this.floorVisual = this.add.tileSprite(
    //   0,
    //   this.scale.height - floorHeight,
    //   this.scale.width,
    //   floorHeight,
    //   'arena-ground'
    // ).setOrigin(0, 0);

    // // Collision layer
    // this.floorPhysics = this.physics.add.staticGroup();
    // this.floorPhysics.create(
    //   this.scale.width / 2,
    //   this.scale.height - 20,
    //   'arena-ground'
    // ).setScale(1, 0.2).refreshBody();

    // Sound logic
    this.soundManager = new SoundManager(this);

    this.sound.add('backgroundMusic', { loop: true });
    this.sound.play('backgroundMusic');

    // Obstacles logic
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

    // this.physics.add.collider(this.player.sprite, this.floorPhysics);
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

  getNextBg () {
    this.bgIndex = (this.bgIndex + 1) % this.bgTextures.length;
    return this.bgTextures[this.bgIndex];
  }

  getRightmostBg () {
    return this.backgrounds.reduce((rightmost, bg) => {
      return bg.x > rightmost.x ? bg : rightmost;
    }, this.backgrounds[0]);
  }

  togglePause () {
    this.isPaused = !this.isPaused;

    if (this.isPaused) {
      this.physics.world.isPaused = true;
      this.time.paused = true;

      this.pauseGame(); // Use your velocity-based pause helper here

      this.scene.pause('GameScene');
    } else {
      this.physics.world.isPaused = false;
      this.time.paused = false;

      this.resumeGame(); // Use your velocity-based resume helper here

      this.scene.resume('GameScene');
    }
  }

  pauseGame () {
    this.isPaused = true;
    this.physics.world.isPaused = true;
    this.time.paused = true;

    pauseVelocity([
      ...this.obstacles.getChildren(),
      ...this.tokens.getChildren(),
      ...this.powerups.getChildren()
    ]);
    this.backgrounds.forEach(bg => {
      bg.tilePositionXFreeze = true;
    });
  }

  resumeGame () {
    this.isPaused = false;
    this.physics.world.isPaused = false;
    this.time.paused = false;

    resumeVelocity([
      ...this.obstacles.getChildren(),
      ...this.tokens.getChildren(),
      ...this.powerups.getChildren()
    ]);
    this.backgrounds.forEach(bg => {
      bg.tilePositionXFreeze = false;
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

  spawnObstacle () {
    const rand = Phaser.Math.Between(0, 2);
    const x = 800;
    const y = 300;

    switch (rand) {
      case 0:
        createObstacle('crate', this, x, y);
        break;
      case 1:
        createObstacle('flying-enemy', this, x, y - 10);
        break;
      case 2:
        createObstacle('group', this, x, y, { count: 4 });
        break;
    }
  }

  handleCollision (player, obstacle) {
    this.scene.restart();
  }

  update (time, delta) {
    if (this.isPaused) return;
    this.player.update(time, delta);
    const { width } = this.scale;

    for (const bg of this.backgrounds) {
      bg.x -= this.bgSpeed;

      // When bg1 goes offscreen, recycle it to the right
      if (bg.x <= -width) {
        // Move it to the rightmost position
        const rightmost = this.getRightmostBg();
        bg.x = rightmost.x + width;

        //  Update its texture to the next in sequence
        bg.setTexture(this.getNextBg());
      }
    }

    // Move tokens and powerups left
    this.tokens.children.iterate(token => {
      if (!token) return;
      token.x -= 4;
      if (token.x < -token.width) {
        token.destroy();
      }
    });

    this.powerups.children.iterate(powerup => {
      if (!powerup) return;
      powerup.x -= 4;
      if (powerup.x < -powerup.width) {
        powerup.destroy();
      }
    });
  }
}
