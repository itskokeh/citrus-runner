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
    this.score = 0;
    this.hasMagnet = false;
    this.doubleCoins = false;
    this.airSuspension = false;
    this.sprite.body.setGravityY(1000);
  }

  collectToken () {
    const pointsToAdd = this.doubleCoins ? 2 : 1;
    this.score += pointsToAdd;
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
  }
}
