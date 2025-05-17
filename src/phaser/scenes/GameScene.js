import Player from '../objects/Player';
import { spawnToken } from '../objects/Token';
import { spawnPowerup, applyPowerup } from '../objects/powerups/spawner';
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
    this.physics.world.isPaused = false;
    this.time.paused = false;

    // Add debug render to see actual hitboxes
    // this.physics.world.createDebugGraphic();
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
    this.bgMusic = this.sound.add('backgroundMusic', { loop: true });
    this.input.once('pointerdown', () => {
      this.bgMusic.play();
    });

    // Obstacles logic
    this.obstacles = this.add.group();

    // Player logic
    const jumpSound = this.sound.add('jump');
    this.player = new Player(this, 100, 400);
    this.input.on('pointerdown', () => {
      this.player.jump();
      jumpSound.play({ volume: 0.05 });
    });

    this.tokens = this.add.group();

    this.powerups = this.add.group();

    this.createTokenCluster();

    this.powerupTimer = this.time.addEvent({
      delay: 30000,
      callback: () => spawnPowerup(this),
      loop: true
    });

    this.time.addEvent({
      delay: 3000,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true
    });

    this.physics.add.overlap(this.player.sprite, this.tokens, (_, token) => {
      token.destroy();
      this.player.collectToken();
    });

    this.physics.add.overlap(this.player.sprite, this.powerups, (_, powerup) => {
      applyPowerup(this.player, powerup.type);
      powerup.destroy();
    });

    this.physics.add.overlap(this.player.sprite, this.obstacles, (_, obstacle) => {
      this.scene.pause();
      this.physics.pause();
      this.bgMusic.stop();
      this.scene.launch('GameOverScene');
    });

    // // Increase game speed
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

    this.startTime = this.time.now;

    this.time.addEvent({
      delay: 10000,
      callback: () => {
        const elapsed = (this.time.now - this.startTime) / 1000;

        const difficultyFactor = Math.log(1 + elapsed);

        this.gameSpeed = 2 + difficultyFactor * 0.2;
        this.bgMultiplier = 0.8 + difficultyFactor * 0.02;
        this.objSpeed = 70 + difficultyFactor * 2;

        this.updateSpeeds();
      },
      loop: true
    });
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
      this.bgMusic.pause();
      this.pauseGame(); // Use your velocity-based pause helper here

      this.scene.pause('GameScene');
    } else {
      this.physics.world.isPaused = false;
      this.time.paused = false;
      this.bgMusic.resume();
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

  //   if (this.clusterTimer) this.clusterTimer.remove();

  //   for (let i = 0; i < clusterSize; i++) {
  //     this.time.delayedCall(i * 200, () => spawnToken(this));
  //   }

  //   this.clusterTimer = this.time.delayedCall(3000 + (clusterSize * 200), () => {
  //     this.createTokenCluster();
  //   });
  // }

  createTokenCluster () {
    const clusterSize = Phaser.Math.Between(10, 30);
    const isZigZag = Phaser.Math.Between(0, 4) === 0; // 20% chance to zig-zag
    const startY = Phaser.Math.Between(100, this.scale.height - 100);
    const yStep = 20;
    const direction = Phaser.Math.Between(0, 1) === 0 ? -1 : 1; // zig up or down
    const delayPerToken = 200;

    if (this.clusterTimer) this.clusterTimer.remove();

    for (let i = 0; i < clusterSize; i++) {
      this.time.delayedCall(i * delayPerToken, () => {
        const y = isZigZag
          ? Phaser.Math.Clamp(startY + (i * yStep * direction), 50, this.scale.height - 50)
          : startY;
        spawnToken(this, y);
      });
    }

    this.clusterTimer = this.time.delayedCall(3000 + (clusterSize * delayPerToken), () => {
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
      obj.setVelocityX(-this.gameSpeed * this.objSpeed);
    });
    this.tokens.children.each(obj => {
      obj.setVelocityX(-this.gameSpeed * this.objSpeed);
    });
    this.obstacles.children.each(obj => {
      obj.setVelocityX(-this.gameSpeed * this.objSpeed);
    });
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
  }
}
