export default function createCrate (scene, x, y, options = {}) {
  const crate = scene.physics.add.image(x, y, 'crate');
  crate.setImmovable(true);
  crate.setVelocityX(options.speed || -200);
  crate.setSize(options.width || 32, options.height || 32);
  scene.obstacles.add(crate);
  return crate;
}
