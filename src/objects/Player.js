export default class Player {
  constructor (scene, x, y) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, 'player').setCollideWorldBounds(true);
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.score = 0;
    scene.registry.set('score', 0);
    this.maxJumps = 2;
    this.jumpCount = 2;
    this.airSuspension = false;
    // this.sprite.body.setGravityY(1000);
  }

  collectToken () {
    this.score += this.doubleCoins ? 2 : 1;
    this.scene.registry.set('score', this.score);
  }

  update () {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
      if (this.sprite.body.blocked.down || this.jumpCount < this.maxJumps) {
        this.sprite.setVelocityY(-400);
        this.jumpCount++;
        //  If this is the second jump, extend hang time slightly
        if (this.jumpCount === 2) {
          this.temporarilyFloat();
        }
      }
    }
    if (this.cursors.up.isDown && this.sprite.body.touching.down) {
      this.jumpCount = 0;
      this.sprite.setVelocityY(-500);
    }
  }

  temporarilyFloat () {
    if (this.airSuspension) return;

    this.airSuspension = true;
    const originalGravity = this.sprite.body.gravity.y;
    this.sprite.body.setGravityY(500);

    this.scene.time.delayedCall(800, () => {
      this.sprite.body.setGravityY(originalGravity);
      this.airSuspension = false;
    });
  }
}
