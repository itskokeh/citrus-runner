import createCrate from './crate';

export default function createGroup (scene, startX, y, options = {}) {
  const count = options.count || 3;
  const spacing = options.spacing || 35;
  const members = [];

  for (let i = 0; i < count; i++) {
    const crate = createCrate(scene, startX + i * spacing, y, options);
    members.push(crate);
  }

  return members;
}
