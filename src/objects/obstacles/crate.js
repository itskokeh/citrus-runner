// export default function createCrate (scene, x, y, options = {}) {
//   const width = options.width || 48;
//   const height = options.height || 48;

//   const crate = scene.obstacles.create(x, y, 'crate');
//   crate.setImmovable(true);
//   crate.setVelocityX(options.speed || -200);
//   crate.setSize(width, height);
//   crate.setDisplaySize(width, height);

//   return crate;
// }

import { scaleObjectToScreen, scaleValue } from '../../utils/scaleObject';

export default function createCrate (scene, x, y, options = {}) {
  const baseScale = scaleObjectToScreen(scene.scale.width, scene.scale.height, scene, 1);
  const width = scaleValue(options.width || 48, baseScale);
  const height = scaleValue(options.height || 48, baseScale);
  const scaledX = scaleValue(x, baseScale);
  const scaledY = scaleValue(y, baseScale);

  const crate = scene.obstacles.create(scaledX, scaledY, 'crate');
  crate.setImmovable(true);
  crate.setVelocityX(scaleValue(options.speed || -200, baseScale));
  crate.setSize(width, height);
  crate.setDisplaySize(width, height);

  return crate;
}
