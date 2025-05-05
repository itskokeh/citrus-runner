import Player from '../objects/Player';
import { spawnToken } from '../objects/Token';
import { spawnPowerup, applyPowerup } from '../utils/powerups';
import SoundManager from '../utils/soundManager';
import { pauseVelocity, resumeVelocity } from '../utils/velocityManager';
import { spawnCrateFormation, spawnFlyingDynamite } from '../objects/obstacles/spawner';

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
    this.gameSpeed = 2;
    this.bgMultiplier = 0.8;
    this.objSpeed = 70;
  }

  create () {
    // Add debug render to see actual hitboxes
    this.physics.world.createDebugGraphic();
    // Background
    const { width, height } = this.scale;
    this.bgTextures = ['arena-1', 'arena-2', 'arena-3', 'arena-4'];
    this.bgIndex = 0;
    // this.bgSpeed = this.gameSpeed * this.bgMultiplier;
    this.bgSpeed = 2;

    this.backgrounds = [];

    for (let i = 0; i < this.bgTextures.length; i++) {
      const bg = this.add.image(
        i * width, 0, this.bgTextures[i]
      ).setOrigin(
        0, 0
      ).setDisplaySize(width, height);
      this.backgrounds.push(bg);
      // this.fitBackgroundCover(bg);
    }

    // Sound
    this.soundManager = new SoundManager(this);

    // this.sound.add('backgroundMusic', { loop: true });
    // this.sound.play('backgroundMusic');

    // Obstacles logic
    this.obstacles = this.physics.add.group({
      allowGravity: false
    });

    // Player logic
    this.player = new Player(this, 100, 400);
    this.input.on('pointerdown', () => {
      this.player.jump();
    });

    this.tokens = this.add.group();

    this.powerups = this.physics.add.group({
      allowGravity: false
    });

    this.createTokenCluster();

    this.powerupTimer = this.time.addEvent({
      delay: 3000,
      callback: () => spawnPowerup(this),
      loop: true
    });

    console.log('Dynamite texture exists:', this.textures.exists('flying-dynamite'));
    this.time.addEvent({
      delay: 3000,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true
    });

    this.physics.add.overlap(this.player.sprite, this.tokens, (_, token) => {
      token.disableBody(true, true);
      this.player.collectToken();
    });

    this.physics.add.overlap(this.player.sprite, this.powerups, (_, powerup) => {
      applyPowerup(this.player, powerup);
      powerup.destroy();
    });
    // this.physics.add.overlap(this.player.sprite, this.obstacles, (_, obstacle) => {
    //   obstacle.destroy();
    //   this.player.destroy();
    //   this.scene.restart();
    // });

    // Increase game speed
    // this.time.addEvent({
    //   delay: 10000,
    //   callback: () => {
    //     this.gameSpeed += 0.1;
    //     this.bgMultiplier = (this.bgMultiplier * 102) / 100;
    //     this.objSpeed = (this.objSpeed * 105) / 100;
    //     this.updateSpeeds();
    //   },
    //   loop: true
    // });
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

  // fitBackgroundCover (image) {
  //   const { width, height } = this.scale;

  //   const scaleX = width / image.width;
  //   const scaleY = height / image.height;
  //   const scale = Math.min(scaleX, scaleY); // 'cover' behavior

  //   image.setScale(scale);
  //   image.setOrigin(0.5);
  //   image.setPosition(width / 2, height / 2);
  // }

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

  // createTokenCluster () {
  //   const clusterSize = Phaser.Math.Between(3, 6);
  //   let tokensSpawned = 0;

  //   const spawnClusterToken = () => {
  //     if (tokensSpawned < clusterSize) {
  //       spawnToken(this);
  //       tokensSpawned++;
  //       this.time.delayedCall(200, spawnClusterToken);
  //     } else {
  //       this.time.delayedCall(3000, () => this.createTokenCluster());
  //     }
  //   };
  //   spawnClusterToken();
  // }

  createTokenCluster () {
    const clusterSize = Phaser.Math.Between(3, 6);

    // Clear any existing delayed calls
    if (this.clusterTimer) this.clusterTimer.remove();

    // Spawn initial cluster
    for (let i = 0; i < clusterSize; i++) {
      this.time.delayedCall(i * 200, () => spawnToken(this));
    }

    // Schedule next cluster
    this.clusterTimer = this.time.delayedCall(3000 + (clusterSize * 200), () => {
      this.createTokenCluster();
    });
  }

  spawnObstacle () {
    const choice = Phaser.Math.Between(0, 1);
    if (choice === 0) {
      spawnCrateFormation(this);
    } else {
      spawnFlyingDynamite(this);
    }
  }

  updateSpeeds () {
    this.powerups.children.each(obj => {
      obj.setVelocityX(-this.gameSpeed * this.objectsSpeed);
    });
    this.tokens.children.each(obj => {
      obj.setVelocityX(-this.gameSpeed * this.objSpeed);
    });
    this.obstacles.children.each(obj => {
      obj.setVelocityX(-this.gameSpeed * this.objSpeed);
    });
  }

  // handleCollision (player, obstacle) {
  //   this.obstacles.destroy();
  //   this.scene.restart();
  // }

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
  }
}
