export function spawnToken (scene) {
  const xPosition = scene.scale.width + 100;
  const minY = 50;
  const maxY = scene.scale.height - 50;
  const yPosition = Phaser.Math.Between(minY, maxY);

  const token = scene.tokens.create(xPosition, yPosition, 'token');
  token.displayWidth = 56;
  token.displayHeight = 720 * (56 / 1320);
  token.setVelocityX(-50);
  token.setCollideWorldBounds(false);
  token.setImmovable(true);
}
