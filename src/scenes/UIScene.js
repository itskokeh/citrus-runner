// export default class UIScene extends Phaser.Scene {
//   constructor () {
//     super('UIScene');
//   }

//   create () {
//     console.log('UIScene loaded');

//     const muteButton = this.add.text(10, 10, 'Mute', {
//       font: '24px Arial',
//       fill: '#fff'
//     }).setInteractive();

//     const padding = 10;
//     muteButton.setPosition(this.cameras.main.width - muteButton.width - padding, padding);

//     const gameScene = this.scene.get('GameScene');
//     const soundManager = gameScene.soundManager;

//     muteButton.on('pointerdown', () => {
//       soundManager.toggleMute();
//       muteButton.setText(soundManager.isMuted ? 'Unmute' : 'Mute');
//     });

//     // Optional: set initial text correctly
//     muteButton.setText(soundManager.isMuted ? 'Unmute' : 'Mute');

//     // Inside UIScene.js, in create()
//     const centerX = this.cameras.main.width / 2;
//     const topOffset = 20; // Distance from the top of the screen

//     this.pauseButton = this.add.text(centerX, topOffset, 'Pause', {
//       fontSize: '24px',
//       fill: '#fff'
//     }).setOrigin(0.5, 0) // center horizontally, stick to top
//       .setInteractive()
//       .on('pointerdown', () => this.togglePause());

//     this.resumeButton = this.add.text(centerX, topOffset, 'Resume', {
//       fontSize: '24px',
//       fill: '#fff'
//     }).setOrigin(0.5, 0)
//       .setInteractive()
//       .setVisible(false)
//       .on('pointerdown', () => this.togglePause());

//     this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '20px', fill: 'white' });

//     this.registry.events.on('changedata', (parent, key, data) => {
//       if (key === 'score') {
//         this.scoreText.setText(`Score: ${data}`);
//       }
//     });
//   }

//   togglePause () {
//     const gameScene = this.scene.get('GameScene');

//     this.isPaused = !this.isPaused;

//     if (this.isPaused) {
//       gameScene.togglePause(); // Call a method in GameScene to handle pause
//       this.pauseButton.setVisible(false);
//       this.resumeButton.setVisible(true);
//     } else {
//       gameScene.togglePause(); // Resume everything from GameScene
//       this.pauseButton.setVisible(true);
//       this.resumeButton.setVisible(false);
//     }
//   }
// }

import { scaleObjectToScreen, scaleValue } from '../utils/scaleObject';

export default class UIScene extends Phaser.Scene {
  constructor () {
    super('UIScene');
  }

  create () {
    console.log('UIScene loaded');
    const baseScale = scaleObjectToScreen(this.cameras.main.width, this.cameras.main.height, this, 1);

    const muteButton = this.add.text(10, 10, 'Mute', {
      font: `${scaleValue(24, baseScale)}px Arial`,
      fill: '#fff'
    }).setInteractive();

    const padding = scaleValue(10, baseScale);
    muteButton.setPosition(this.cameras.main.width - muteButton.width - padding, padding);

    const gameScene = this.scene.get('GameScene');
    const soundManager = gameScene.soundManager;

    muteButton.on('pointerdown', () => {
      soundManager.toggleMute();
      muteButton.setText(soundManager.isMuted ? 'Unmute' : 'Mute');
    });

    muteButton.setText(soundManager.isMuted ? 'Unmute' : 'Mute');

    const centerX = this.cameras.main.width / 2;
    const topOffset = scaleValue(20, baseScale);

    this.pauseButton = this.add.text(centerX, topOffset, 'Pause', {
      fontSize: `${scaleValue(24, baseScale)}px`,
      fill: '#fff'
    })
      .setOrigin(0.5, 0)
      .setInteractive()
      .on('pointerdown', () => this.togglePause());

    this.resumeButton = this.add.text(centerX, topOffset, 'Resume', {
      fontSize: `${scaleValue(24, baseScale)}px`,
      fill: '#fff'
    })
      .setOrigin(0.5, 0)
      .setInteractive()
      .setVisible(false)
      .on('pointerdown', () => this.togglePause());

    this.scoreText = this.add.text(padding, padding, 'Score: 0', {
      fontSize: `${scaleValue(20, baseScale)}px`,
      fill: 'white'
    });

    this.registry.events.on('changedata', (parent, key, data) => {
      if (key === 'score') {
        this.scoreText.setText(`Score: ${data}`);
      }
    });

    // Handle resize to reposition UI elements
    this.scale.on('resize', (gameSize) => {
      const newBaseScale = scaleObjectToScreen(gameSize.width, gameSize.height, this, 1);
      const newPadding = scaleValue(10, newBaseScale);
      muteButton.setPosition(gameSize.width - muteButton.width - newPadding, newPadding);
      this.scoreText.setPosition(newPadding, newPadding);
      const newCenterX = gameSize.width / 2;
      const newTopOffset = scaleValue(20, newBaseScale);
      this.pauseButton.setPosition(newCenterX, newTopOffset);
      this.resumeButton.setPosition(newCenterX, newTopOffset);
      muteButton.setStyle({ font: `${scaleValue(24, newBaseScale)}px Arial` });
      this.pauseButton.setStyle({ fontSize: `${scaleValue(24, newBaseScale)}px` });
      this.resumeButton.setStyle({ fontSize: `${scaleValue(24, newBaseScale)}px` });
      this.scoreText.setStyle({ fontSize: `${scaleValue(20, newBaseScale)}px` });
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
