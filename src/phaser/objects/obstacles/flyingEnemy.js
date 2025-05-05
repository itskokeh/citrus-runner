export default function createFlyingEnemy (scene, x, y) {
  const enemy = scene.obstacles.create(x, y, 'flying-dynamite');
  const targetWidth = 100;
  const targetHeight = targetWidth * (enemy.height / enemy.width);

  enemy.setVelocityX(-scene.gameSpeed * scene.objSpeed);
  enemy.setSize(targetWidth, targetHeight);
  enemy.setDisplaySize(targetWidth, targetHeight);

  return enemy;
}
