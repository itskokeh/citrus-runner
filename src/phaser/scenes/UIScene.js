export default class UIScene extends Phaser.Scene {
  constructor () {
    super('UIScene');
  }

  create () {
    console.log('UIScene loaded');

    const gameScene = this.scene.get('GameScene');
    const soundManager = gameScene.soundManager;
    const padding = 10;
    const muteButton = this.add.image(
      this.cameras.main.width - padding,
      padding,
      soundManager.isMuted ? 'unmute-icon' : 'mute-icon'
    ).setOrigin(
      1, 0
    ).setScale(
      1
    ).setInteractive();
    // muteButton.setPosition(this.cameras.main.width - muteButton.width - padding, padding);

    muteButton.on('pointerdown', () => {
      soundManager.toggleMute();
      // Verify textures exist before switching
      const newTexture = soundManager.isMuted ? 'unmute-icon' : 'mute-icon';
      if (this.textures.exists(newTexture)) {
        muteButton.setTexture(newTexture);
      } else {
        console.error(`Texture "${newTexture}" not found!`);
        // Fallback to text if images fail
        muteButton.setTexture(soundManager.isMuted ? 'unmute-icon' : 'mute-icon');
      }
    });
    // Optional: set initial text correctly
    // muteButton.setText(soundManager.isMuted ? 'Unmute' : 'Mute');

    // Inside UIScene.js, in create()
    const centerX = this.cameras.main.width / 2;
    const topOffset = 20; // Distance from the top of the screen

    this.pauseButton = this.add.image(centerX, topOffset, 'pause-icon', {
    }).setOrigin(0.5, 0) // center horizontally, stick to top
      .setInteractive()
      .on('pointerdown', () => this.togglePause());

    this.resumeButton = this.add.image(centerX, topOffset, 'play-icon', {
    }).setOrigin(0.5, 0)
      .setInteractive()
      .setVisible(false)
      .on('pointerdown', () => this.togglePause());

    this.scoreText = this.add.text(10, 10, 'Score: 0', {
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
