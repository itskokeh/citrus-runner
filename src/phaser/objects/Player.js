export default class Player {
  constructor (scene, x, y) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, 'player');
    this.sprite.setCollideWorldBounds(true);
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.score = 0;
    this.airSuspension = false;
    this.sprite.body.setGravityY(1000);

    scene.input.on('pointerdown', () => {
      this.jump();
    });
  }

  collectToken () {
    this.score += this.doubleCoins ? 2 : 1;
    this.scene.registry.set('score', this.score);
  }

  jump () {
    this.sprite.setVelocityY(-350);
    this.suspendGravity();
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

  update () {}
}
