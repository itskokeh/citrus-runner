export default class GameOverScene extends Phaser.Scene {
  constructor () {
    super('GameOverScene');
  }

  create () {
    const { width, height } = this.sys.game.canvas;

    const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.9).setOrigin(0);

    const title = this.add.text(width / 2, height / 2 - 50, 'Game Over', {
      fontSize: '32px',
      color: '#fff'
    }).setOrigin(0.5);

    const finalScore = this.registry.get('score');
    const scoreText = this.add.text(width / 2, height / 2, `Score: ${finalScore}`, {
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

    const container = this.add.container(0, 0, [overlay, title, scoreText, tryAgainBtn]);
    container.alpha = 0;

    this.tweens.add({
      targets: container,
      alpha: 1,
      duration: 500,
      ease: 'Power2'
    });
  }
}
