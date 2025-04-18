export function spawnPowerup (scene) {
  const types = ['magnet', 'double', 'speed', 'shield']
  const type = Phaser.Utils.Array.GetRandom(types)
  const powerup = scene.powerups.create(800, Phaser.Math.Between(300, 500), type)
  powerup.setVelocityX(-200)
}

export function applyPowerup (player, type) {
  switch (type) {
    case 'magnet':

      break
    case 'double':
      player.doubleCoins = true
      break
    case 'speed':
      player.sprite.setVelocityX(100)
      break
    case 'shield':
      player.shielded = true
      break
  }
  setTimeout(() => {
    if (type === 'double') player.doubleCoins = false
    if (type === 'speed') player.sprite.setVelocityX(0)
    if (type === 'shield') player.shielded = false
  }, 15000)
}
