export default function createCrate (scene, x, y, options = {}) {
  const width = options.width || 48;
  const height = options.height || 48;

  const crate = scene.obstacles.create(x, y, 'crate');
  crate.setImmovable(true);
  crate.setVelocityX(options.speed || -200);
  crate.setSize(width, height);
  crate.setDisplaySize(width, height);

  return crate;
}
