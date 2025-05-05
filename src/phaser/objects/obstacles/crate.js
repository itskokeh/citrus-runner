export default function createCrate (scene, x, y) {
  const crate = scene.obstacles.create(x, y, 'crate');
  const targetWidth = 50;
  const targetHeight = targetWidth * (crate.height / crate.width);

  crate.setImmovable(true);
  crate.setVelocityX(-scene.gameSpeed * scene.objSpeed);
  crate.setSize(targetWidth, targetHeight);
  crate.setDisplaySize(targetWidth, targetHeight);

  return crate;
}
