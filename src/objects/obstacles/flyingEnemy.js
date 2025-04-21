export default function createFlyingEnemy (scene, x, y, options = {}) {
  const enemy = scene.physics.add.sprite(x, y, 'flying_enemy');
  enemy.setVelocityX(options.speed || -300);
  enemy.setSize(options.width || 48, options.height || 32);

  scene.obstacles.add(enemy);
  return enemy;
}
