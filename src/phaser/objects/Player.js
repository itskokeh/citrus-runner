export default class Player {
  constructor (scene, x, y) {
    this.scene = scene;
    this.sprite = scene.physics.add.image(x, y, 'player');
    const targetWidth = 50;
    const targetHeight = targetWidth * (this.sprite.height / this.sprite.width);
    this.sprite.displayHeight = targetHeight;
    this.sprite.displayWidth = targetWidth;
    this.sprite.body.setCollideWorldBounds(true);
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.score = 0;
    this.hasMagnet = false;
    this.doubleCoins = false;
    this.airSuspension = false;
    this.sprite.body.setGravityY(1000);
    this.jumpVelocity = -350;
    scene.input.on('pointerdown', () => this.jump());
  }

  collectToken () {
    const pointsToAdd = this.doubleCoins ? 2 : 1;
    this.score += pointsToAdd;
    this.scene.registry.set('score', this.score);
  }

  jump () {
    this.sprite.setVelocityY(this.jumpVelocity);
    this.suspendGravity();
  }

  suspendGravity () {
    if (this.airSuspension) return;

    this.airSuspension = true;
    const originalGravity = this.sprite.body.gravity.y;
    this.sprite.body.setGravityY(700);

    this.scene.time.delayedCall(800, () => {
      this.sprite.body.setGravityY(originalGravity);
      this.airSuspension = false;
    });
  }

  applyMagnetEffect () {
    const tokens = this.scene.tokens.getChildren();
    const horizontalOffset = 400; // how far ahead to attract
    const verticalRange = this.scene.scale.height; // full vertical span of effect

    const playerX = this.sprite.x;
    const playerY = this.sprite.y;

    tokens.forEach(token => {
      if (!token.active) return;

      const inXRange = token.x > playerX && token.x < playerX + horizontalOffset;
      const inYRange = Math.abs(token.y - playerY) <= verticalRange / 2;

      if (inXRange && inYRange) {
        const angle = Phaser.Math.Angle.Between(token.x, token.y, playerX, playerY);
        const pullSpeed = 1000;
        token.body.velocity.x = Math.cos(angle) * pullSpeed;
        token.body.velocity.y = Math.sin(angle) * pullSpeed;
      }
    });
  }

  update () {
    if (this.hasMagnet) {
      this.applyMagnetEffect();
    }

    // Jump with keyboard
    if (
      Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
      Phaser.Input.Keyboard.JustDown(this.spaceKey)
    ) {
      this.jump();
    }
  }
}

// export default class Player {
//   constructor (scene, x, y) {
//     this.scene = scene;
//     this.sprite = scene.physics.add.image(x, y, 'player');

//     const targetWidth = 50;
//     const targetHeight = targetWidth * (this.sprite.height / this.sprite.width);
//     this.sprite.displayHeight = targetHeight;
//     this.sprite.displayWidth = targetWidth;

//     this.sprite.body.setCollideWorldBounds(true);
//     this.sprite.body.setGravityY(1200); // Strong gravity for constant downward pull

//     this.cursors = scene.input.keyboard.createCursorKeys();
//     this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

//     this.jumpVelocity = -300; // Like a flap — adjust for feel
//     this.score = 0;
//     this.hasMagnet = false;
//     this.doubleCoins = false;

//     // Jump on click/tap
//     scene.input.on('pointerdown', () => this.jump());
//   }

//   collectToken () {
//     const pointsToAdd = this.doubleCoins ? 2 : 1;
//     this.score += pointsToAdd;
//     this.scene.registry.set('score', this.score);
//   }

//   jump () {
//     this.sprite.setVelocityY(this.jumpVelocity); // Instant vertical burst
//   }

//   applyMagnetEffect () {
//     const tokens = this.scene.tokens.getChildren();
//     const horizontalOffset = 400;
//     const verticalRange = this.scene.scale.height;
//     const playerX = this.sprite.x;
//     const playerY = this.sprite.y;

//     tokens.forEach(token => {
//       if (!token.active) return;

//       const inXRange = token.x > playerX && token.x < playerX + horizontalOffset;
//       const inYRange = Math.abs(token.y - playerY) <= verticalRange / 2;

//       if (inXRange && inYRange) {
//         const angle = Phaser.Math.Angle.Between(token.x, token.y, playerX, playerY);
//         const pullSpeed = 1000;
//         token.body.velocity.x = Math.cos(angle) * pullSpeed;
//         token.body.velocity.y = Math.sin(angle) * pullSpeed;
//       }
//     });
//   }

//   update () {
//     if (this.hasMagnet) {
//       this.applyMagnetEffect();
//     }

//     // Jump with keyboard
//     if (
//       Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
//       Phaser.Input.Keyboard.JustDown(this.spaceKey)
//     ) {
//       this.jump();
//     }
//   }
// }
