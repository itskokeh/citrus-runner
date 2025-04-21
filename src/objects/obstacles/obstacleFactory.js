import createCrate from './crate';
import createMovingSpike from './movingSpike';
import createFlyingEnemy from './flyingEnemy';
import createGroup from './groupFactory';

export function createObstacle (type, scene, x, y, options = {}) {
  switch (type) {
    case 'crate':
      return createCrate(scene, x, y, options);
    case 'spike':
      return createMovingSpike(scene, x, y, options);
    case 'flying':
      return createFlyingEnemy(scene, x, y, options);
    case 'group':
      return createGroup(scene, x, y, options);
    default:
      throw new Error(`Unknown obstacle type: ${type}`);
  }
}
