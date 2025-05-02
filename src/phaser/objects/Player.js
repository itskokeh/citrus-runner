export default class Player {
  constructor (scene, x, y) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, 'player');
    this.sprite.setCollideWorldBounds(true);
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.score = 0;
    // scene.registry.set('score', 0);
    this.maxJumps = 2;
    this.jumpCount = 2;
    this.airSuspension = false;
    this.sprite.body.setGravityY(1000);
  }

  collectToken () {
    this.score += this.doubleCoins ? 2 : 1;
    this.scene.registry.set('score', this.score);
  }

  jump () {
    const isGrounded = this.sprite.body.blocked.down || this.sprite.body.touching.down;

    // Reset jump count when grounded
    if (isGrounded) {
      this.jumpCount = 0;
    }
    if (this.jumpCount < this.maxJumps) {
      this.sprite.setVelocityY(-500);
      this.jumpCount++;
      this.suspendGravity();
    }
  }

  suspendGravity () {
    if (this.airSuspension) return;

    this.airSuspension = true;
    const originalGravity = this.sprite.body.gravity.y;
    this.sprite.body.setGravityY(400);

    this.scene.time.delayedCall(800, () => {
      this.sprite.body.setGravityY(originalGravity);
      this.airSuspension = false;
    });
  }

  update () {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      this.jump();
    }
  }
}
