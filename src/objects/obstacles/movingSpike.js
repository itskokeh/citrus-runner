export default function createMovingSpike (scene, x, y, options = {}) {
  const spike = scene.physics.add.image(x, y, 'spike');
  spike.setImmovable(true);
  spike.setVelocityX(options.speed || -250);

  // Up and down tween motion
  scene.tweens.add({
    targets: spike,
    y: y + 50,
    yoyo: true,
    duration: options.duration || 1000,
    repeat: -1,
  });

  scene.obstacles.add(spike);
  return spike;
}
