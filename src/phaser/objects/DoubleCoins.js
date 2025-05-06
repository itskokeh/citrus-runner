export function doubleCoins (scene) {
  const xPosition = scene.scale.width + 100;
  const minY = 50;
  const maxY = scene.scale.height - 50;
  const yPosition = Phaser.Math.Between(minY, maxY);

  const powerup = scene.physics.add.sprite(xPosition, yPosition, 'double-coin');
  scene.powerups.add(powerup);

  const targetWidth = 50;
  const targetHeight = targetWidth * (powerup.height / powerup.width);
  powerup.displayWidth = targetWidth;
  powerup.displayHeight = targetHeight;

  powerup.setVelocityX(-scene.gameSpeed * scene.objSpeed);
  powerup.setCollideWorldBounds(false);
  powerup.body.setAllowGravity(false);

  powerup.type = 'double-coin';
  return powerup;
}
