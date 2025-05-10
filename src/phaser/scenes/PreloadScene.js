export default class PreloadScene extends Phaser.Scene {
  constructor () {
    super('PreloadScene');
  }

  preload () {
    this.load.font('SpaceGrotesk', '/fonts/SpaceGrotesk-Bold.ttf');
    this.load.image('pause-icon', '/icons/pause_24dp_FFF.png');
    this.load.image('play-icon', '/icons/play_24dp_FFF.png');
    this.load.image('mute-icon', '/icons/volume_off_24dp_FFF.png');
    this.load.image('unmute-icon', '/icons/volume_up_24dp_FFF.png');
    this.load.image('arena-1', '/backgrounds/arcade-1.webp');
    this.load.image('arena-2', '/backgrounds/arcade-2.webp');
    this.load.image('arena-3', '/backgrounds/arcade-3.webp');
    this.load.image('arena-4', '/backgrounds/arcade-4.webp');
    this.load.image('crate', '/obstacles/crate.webp');
    this.load.image('flying-dynamite', '/obstacles/flying-dynamite.webp');
    this.load.image('magnet', '/powerups/magnet.webp');
    this.load.image('double-coin', '/powerups/double-coin.webp');
    this.load.image('token', '/token/citrus-token.webp');
    this.load.image('player', '/player-sprite/playersprite.webp');
    // this.load.audio('backgroundMusic', '/Space track.mp3');
  }

  create () {
    this.scene.start('GameScene');
    this.scene.start('UIScene');
  }
}
