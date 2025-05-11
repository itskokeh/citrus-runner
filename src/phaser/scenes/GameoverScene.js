export default class GameOverScene extends Phaser.Scene {
  constructor () {
    super('GameOverScene');
  }

  create () {
    const { width, height } = this.sys.game.canvas;

    this.add.rectangle(0, 0, width, height, 0x000000, 0.6).setOrigin(0);

    this.add.text(width / 2, height / 2 - 50, 'Game Over', {
      fontSize: '32px',
      color: '#fff'
    }).setOrigin(0.5);

    const finalScore = this.registry.get('score');
    this.add.text(width / 2, height / 2, `Score: ${finalScore}`, {
      fontFamily: 'SpaceGrotesk',
      fontSize: '24px',
      color: '#fff'
    }).setOrigin(0.5);

    const tryAgainBtn = this.add.text(width / 2, height / 2 + 50, 'Try Again', {
      fontSize: '28px',
      color: 'orange'
    })
      .setOrigin(0.5)
      .setInteractive();

    tryAgainBtn.on('pointerup', () => {
      this.registry.set('score', 0);
      this.scene.stop('GameOverScene');
      this.scene.stop('GameScene');
      this.scene.start('GameScene');
    });
  }
}
