export default function createCrate (scene, x, y) {
  const crate = scene.physics.add.image(x, y, 'crate');
  scene.obstacles.add(crate);
  const targetWidth = 50;
  const targetHeight = targetWidth * (crate.height / crate.width);

  crate.setImmovable(true);
  crate.setVelocityX(-scene.gameSpeed * scene.objSpeed);
  crate.setDisplaySize(targetWidth, targetHeight);
  crate.body.setAllowGravity(false);

  return crate;
}
