// export function spawnToken (scene) {
//   const xPosition = scene.scale.width + 100;
//   const yPosition = Phaser.Math.Between(400, 500);

//   const token = scene.tokens.create(xPosition, yPosition, 'token');
//   token.displayWidth = 56;
//   token.displayHeight = 720 * (56 / 1320);
//   token.setVelocityX(-50);
//   token.setCollideWorldBounds(false);
//   token.setImmovable(true);
// }

import { scaleObjectToScreen, scaleValue } from '../utils/scaleObject';

export function spawnToken (scene) {
  const baseScale = scaleObjectToScreen(scene.scale.width, scene.scale.height, null, 1);
  const xPosition = scaleValue(scene.scale.width + 100, baseScale);
  const yPosition = scaleValue(Phaser.Math.Between(400, 500), baseScale);

  const token = scene.tokens.create(xPosition, yPosition, 'token');
  scaleObjectToScreen(scene.scene.width, scene.scale.height, token, 56 / 1280);
  token.setImmovable(true);
  // token.setCollideWorldBound(false);
  token.setVelocityX(scaleValue(-50, baseScale));
}
