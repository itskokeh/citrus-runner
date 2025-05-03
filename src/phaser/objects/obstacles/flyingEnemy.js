// export default function createFlyingEnemy (scene, x, y, options = {}) {
//   const width = options.width || 48;
//   const height = options.height || 56;

//   const enemy = scene.obstacles.create(x, y, 'flying-dynamite');
//   enemy.setVelocityX(options.speed || -300);
//   enemy.setSize(width, height);
//   enemy.setDisplaySize(width, height);
//   // enemy.body.allowGravity = false;

//   return enemy;
// }

import { scaleObjectToScreen, scaleValue } from '../../utils/scaleObject';

export default function createFlyingEnemy (scene, x, y, options = {}) {
  const baseScale = scaleObjectToScreen(scene.scale.width, scene.scale.height, scene, 1);
  const width = scaleValue(options.width || 48, baseScale);
  const height = scaleValue(options.height || 56, baseScale);
  const scaledX = scaleValue(x, baseScale);
  const scaledY = scaleValue(y, baseScale);

  const enemy = scene.obstacles.create(scaledX, scaledY, 'flying-dynamite');
  enemy.setVelocityX(scaleValue(options.speed || -300, baseScale));
  enemy.setSize(width, height);
  enemy.setDisplaySize(width, height);

  return enemy;
}
