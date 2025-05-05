export function magnet (scene) {
  const xPosition = scene.scale.width + 100;
  const minY = 50;
  const maxY = scene.scale.height - 50;
  const yPosition = Phaser.Math.Between(minY, maxY);

  const powerup = scene.powerups.create(xPosition, yPosition, 'magnet');

  const targetWidth = 50;
  powerup.displayWidth = targetWidth;
  powerup.displayHeight = targetWidth * (powerup.height / powerup.width);

  powerup.setVelocityX(-scene.gameSpeed * scene.objSpeed);
  powerup.setCollideWorldBounds(false);
  powerup.setImmovable(true);

  powerup.type = 'magnet';
  return powerup;
}
