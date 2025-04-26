export default function createFlyingEnemy (scene, x, y, options = {}) {
  const width = options.width || 48;
  const height = options.height || 56;

  const enemy = scene.obstacles.create(x, y, 'flying-dynamite');
  enemy.setVelocityX(options.speed || -300);
  enemy.setSize(width, height);
  enemy.setDisplaySize(width, height);
  // enemy.body.allowGravity = false;

  return enemy;
}
