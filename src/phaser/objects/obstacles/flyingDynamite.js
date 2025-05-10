export default function createFlyingEnemy (scene, x, y) {
  const enemy = scene.physics.add.image(x, y, 'flying-dynamite');
  scene.obstacles.add(enemy);
  const targetWidth = 100;
  const targetHeight = targetWidth * (enemy.height / enemy.width);

  enemy.setVelocityX(-scene.gameSpeed * scene.objSpeed);
  enemy.setDisplaySize(targetWidth, targetHeight);
  enemy.body.setAllowGravity(false);

  return enemy;
}
