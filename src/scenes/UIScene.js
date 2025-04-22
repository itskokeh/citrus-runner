export default class UIScene extends Phaser.Scene {
  constructor () {
    super('UIScene');
  }

  create () {
    this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '20px', fill: 'white' });

    this.registry.events.on('changedata', (parent, key, data) => {
      if (key === 'score') {
        this.scoreText.setText(`Score: ${data}`);
      }
    });
  }
}
