export function spawnToken (scene, y = null) {
  const xPosition = scene.scale.width + 100;
  const minY = 50;
  const maxY = scene.scale.height - 50;
  const yPosition = y ?? Phaser.Math.Between(minY, maxY);

  const token = scene.physics.add.sprite(xPosition, yPosition, 'token');
  scene.tokens.add(token);

  const targetWidth = 40;
  const targetHeight = targetWidth * (token.height / token.width);
  token.displayWidth = targetWidth;
  token.displayHeight = targetHeight;

  token.setVelocityX(-scene.gameSpeed * scene.objSpeed);
  token.setCollideWorldBounds(false);
  token.body.setAllowGravity(false);
}
