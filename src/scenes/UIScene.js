export default class UIScene extends Phaser.Scene {
  constructor () {
    super('UIScene');
  }

  create () {
    console.log('UIScene loaded');

    const muteButton = this.add.text(10, 10, 'Mute', {
      font: '24px Arial',
      fill: '#fff'
    }).setInteractive();

    const padding = 10;
    muteButton.setPosition(this.cameras.main.width - muteButton.width - padding, padding);

    const gameScene = this.scene.get('GameScene');
    const soundManager = gameScene.soundManager;

    muteButton.on('pointerdown', () => {
      soundManager.toggleMute();
      muteButton.setText(soundManager.isMuted ? 'Unmute' : 'Mute');
    });

    // Optional: set initial text correctly
    muteButton.setText(soundManager.isMuted ? 'Unmute' : 'Mute');

    // Inside UIScene.js, in create()
    const centerX = this.cameras.main.width / 2;
    const topOffset = 20; // Distance from the top of the screen

    this.pauseButton = this.add.text(centerX, topOffset, 'Pause', {
      fontSize: '24px',
      fill: '#fff'
    }).setOrigin(0.5, 0) // center horizontally, stick to top
      .setInteractive()
      .on('pointerdown', () => this.togglePause());

    this.resumeButton = this.add.text(centerX, topOffset, 'Resume', {
      fontSize: '24px',
      fill: '#fff'
    }).setOrigin(0.5, 0)
      .setInteractive()
      .setVisible(false)
      .on('pointerdown', () => this.togglePause());

    this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '20px', fill: 'white' });

    this.registry.events.on('changedata', (parent, key, data) => {
      if (key === 'score') {
        this.scoreText.setText(`Score: ${data}`);
      }
    });
  }

  togglePause () {
    const gameScene = this.scene.get('GameScene');

    this.isPaused = !this.isPaused;

    if (this.isPaused) {
      gameScene.togglePause(); // Call a method in GameScene to handle pause
      this.pauseButton.setVisible(false);
      this.resumeButton.setVisible(true);
    } else {
      gameScene.togglePause(); // Resume everything from GameScene
      this.pauseButton.setVisible(true);
      this.resumeButton.setVisible(false);
    }
  }
}
