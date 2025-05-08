import { doubleCoins } from './DoubleCoins';
import { magnet } from './Magnet';

const powerupFunctions = [magnet, doubleCoins];

export function spawnPowerup (scene) {
  console.log('attempting to spwan powerup');
  const randomPowerup = Phaser.Utils.Array.GetRandom(powerupFunctions);
  randomPowerup(scene);
}

export function applyPowerup (player, type) {
  if (player[`${type}Tween`]) {
    player[`${type}Tween`].remove();
  }

  switch (type) {
    case 'magnet':
      player.hasMagnet = true;
      break;
    case 'double-coin':
      player.doubleCoins = true;
      break;
  }

  player[`${type}Tween`] = player.scene.tweens.addCounter({
    duration: 15000,
    onComplete: () => {
      if (type === 'magnet') player.hasMagnet = false;
      if (type === 'double-coin') player.doubleCoins = false;
      player[`${type}Tween`] = null;
    }
  });
}
