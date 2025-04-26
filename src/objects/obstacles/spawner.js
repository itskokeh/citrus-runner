import createCrate from './crate';
import createFlyingEnemy from './flyingEnemy';

export function spawnCrateFormation (scene) {
  console.log('Spawning crate formation');
  const xPosition = scene.scale.width + 100;

  const patterns = [
    [500],
    [400],
    [300],
    [500, 400],
    [500, 400, 300],
    [500, 400, 300, 200],
    [500, 400, 300, 200, 100]
  ];

  const formation = Phaser.Utils.Array.GetRandom(patterns); // Add 300 if you want a 3rd one

  formation.forEach(y => {
    createCrate(scene, xPosition, y, { speed: -200 });
  });
}

export function spawnFlyingDynamite (scene) {
  console.log('Spawning flying dynamite');
  const xPosition = scene.scale.width + 100;
  const yPosition = Phaser.Math.Between(200, 500);

  createFlyingEnemy(scene, xPosition, yPosition, { speed: -300 });
}
