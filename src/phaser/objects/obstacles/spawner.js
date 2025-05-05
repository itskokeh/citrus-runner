import createCrate from './crate';
import createFlyingEnemy from './flyingEnemy';

export function spawnCrateFormation (scene) {
  const xPosition = scene.scale.width + 100;

  const crateHeight = 48; // Matches createCrate default height
  const padding = 50; // Padding from bottom
  const baseY = scene.scale.height - padding;

  // Dynamically determine how many crates can fit
  const maxCrates = Math.floor((scene.scale.height - 2 * padding) / crateHeight);
  const stackSize = Phaser.Math.Between(1, maxCrates);

  // Build Y positions for stacked crates from bottom up
  const formation = Array.from({ length: stackSize }, (_, i) => baseY - i * crateHeight);

  formation.forEach(y => {
    createCrate(scene, xPosition, y);
  });
}

export function spawnFlyingDynamite (scene) {
  const xPosition = scene.scale.width + 100;

  const minY = 100; // padding from top
  const maxY = scene.scale.height - 200; // padding from bottom
  const yPosition = Phaser.Math.Between(minY, maxY);

  createFlyingEnemy(scene, xPosition, yPosition);
}
