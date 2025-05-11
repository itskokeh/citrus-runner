import quitGame from '../utils/quitGame';

export default class UIScene extends Phaser.Scene {
  constructor () {
    super('UIScene');
  }

  create () {
    const gameScene = this.scene.get('GameScene');
    const soundManager = gameScene.soundManager;
    const padding = 10;
    const buttonSpacing = 15;

    const rightEdge = this.cameras.main.width - padding;

    // --- Exit Button (Right-most) ---
    const exitButton = this.add.image(
      rightEdge,
      padding,
      'exit-icon'
    ).setOrigin(1, 0) // Right-aligned
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.stop('GameScene');
        quitGame();
      });

    // --- Mute Button (Middle) ---
    const muteButton = this.add.image(
      rightEdge - exitButton.width - buttonSpacing, // Left of exit button
      padding,
      soundManager.isMuted ? 'mute-icon' : 'unmute-icon'
    ).setOrigin(1, 0)
      .setInteractive()
      .on('pointerdown', () => {
        soundManager.toggleMute();
        const newTexture = soundManager.isMuted ? 'mute-icon' : 'unmute-icon';
        muteButton.setTexture(newTexture);
      });

    // --- Pause Button (Left-most) ---
    this.pauseButton = this.add.image(
      rightEdge - exitButton.width - muteButton.width - (2 * buttonSpacing),
      padding,
      'pause-icon'
    ).setOrigin(1, 0)
      .setInteractive()
      .on('pointerdown', () => this.togglePause());

    this.resumeButton = this.add.image(
      this.pauseButton.x,
      this.pauseButton.y,
      'play-icon'
    ).setOrigin(1, 0)
      .setInteractive()
      .setVisible(false)
      .on('pointerdown', () => this.togglePause());

    // --- Score Text (Top-left) ---
    this.scoreText = this.add.text(padding, padding, 'Score: 0', {
      fontSize: '20px',
      fill: 'white',
      fontFamily: 'SpaceGrotesk'
    });

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
      gameScene.togglePause();
      this.pauseButton.setVisible(false);
      this.resumeButton.setVisible(true);
    } else {
      gameScene.togglePause();
      this.pauseButton.setVisible(true);
      this.resumeButton.setVisible(false);
    }
  }
}
