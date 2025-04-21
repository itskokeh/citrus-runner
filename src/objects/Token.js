export default class Token {
  constructor (scene) {
    this.scene = scene;
    // Spawn token just outside the right side of the screen
    const xPosition = this.scene.scale.width + 100;
    const yPosition = Phaser.Math.Between(400, 500);

    const token = scene.tokens.create(xPosition, yPosition, 'token');
    // Move token to the left at a constant speed
    token.setVelocityX(-50);
    token.setCollideWorldBounds(false);
    token.setImmovable(true);
  }
}
