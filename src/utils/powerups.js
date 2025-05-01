// export function spawnPowerup (scene) {
//   const types = ['magnet', 'double', 'speed', 'shield'];
//   const type = Phaser.Utils.Array.GetRandom(types);
//   const powerup = scene.powerups.create(800, Phaser.Math.Between(300, 500), type);
//   powerup.setVelocityX(-200);
// }

// export function applyPowerup (player, type) {
//   switch (type) {
//     case 'magnet':

//       break;
//     case 'double':
//       player.doubleCoins = true;
//       break;
//     case 'speed':
//       player.sprite.setVelocityX(100);
//       break;
//     case 'shield':
//       player.shielded = true;
//       break;
//   }
//   setTimeout(() => {
//     if (type === 'double') player.doubleCoins = false;
//     if (type === 'speed') player.sprite.setVelocityX(0);
//     if (type === 'shield') player.shielded = false;
//   }, 15000);
// }

import { scaleObjectToScreen, scaleValue } from '../utils/scaleObject';

export function spawnPowerup (scene) {
  const baseScale = scaleObjectToScreen(scene.scale.width, scene.scale.height, scene, 1);
  const types = ['magnet', 'double', 'speed', 'shield'];
  const type = Phaser.Utils.Array.GetRandom(types);
  const powerup = scene.powerups.create(
    scaleValue(800, baseScale),
    scaleValue(Phaser.Math.Between(300, 500), baseScale),
    type
  );
  // Scale powerup size
  scaleObjectToScreen(scene.scale.width, scene.scale.height, powerup, 48 / 1280);
  powerup.setVelocityX(scaleValue(-200, baseScale));
}

export function applyPowerup (player, type) {
  switch (type) {
    case 'magnet':
      break;
    case 'double':
      player.doubleCoins = true;
      break;
    case 'speed':
    { const baseScale = scaleObjectToScreen(player.scene.scale.width, player.scene.scale.height, player, 1);
      player.sprite.setVelocityX(scaleValue(100, baseScale));
      break; }
    case 'shield':
      player.shielded = true;
      break;
  }
  setTimeout(() => {
    if (type === 'double') player.doubleCoins = false;
    if (type === 'speed') player.sprite.setVelocityX(0);
    if (type === 'shield') player.shielded = false;
  }, 15000);
}
