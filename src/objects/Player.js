import { scaleObjectToScreen, scaleValue } from '../utils/scaleObject';

export default class Player {
  constructor (scene, x, y) {
    this.scene = scene;
    // Scale initial position
    const baseScale = scaleObjectToScreen(scene.scale.width, scene.scale.height, null, 1);
    const scaledX = scaleValue(x, baseScale);
    const scaledY = scaleValue(y, baseScale);

    this.sprite = scene.physics.add.sprite(scaledX, scaledY, 'player');
    // Scale player size (0.1 is the desired size relative to screen)
    scaleObjectToScreen(scene.scale.width, scene.scale.height, this.sprite, 0.6);
    this.sprite.setCollideWorldBounds(true);
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.score = 0;
    this.airSuspension = false;
    // Scale gravity
    this.sprite.body.setGravityY(scaleValue(1000, baseScale));

    scene.input.on('pointerdown', () => {
      this.jump();
    });
  }

  collectToken () {
    this.score += this.doubleCoins ? 2 : 1;
    this.scene.registry.set('score', this.score);
  }

  jump () {
    // Scale jump velocity
    const baseScale = scaleObjectToScreen(this.scene.scale.width, this.scene.scale.height, null, 1);
    this.sprite.setVelocityY(scaleValue(-350, baseScale));
    this.suspendGravity();
  }

  suspendGravity () {
    if (this.airSuspension) return;

    this.airSuspension = true;
    const baseScale = scaleObjectToScreen(this.scene.scale.width, this.scene.scale.height, null, 1);
    const originalGravity = scaleValue(1000, baseScale);
    this.sprite.body.setGravityY(scaleValue(400, baseScale));

    this.scene.time.delayedCall(800, () => {
      this.sprite.body.setGravityY(originalGravity);
      this.airSuspension = false;
    });
  }

  update () {}
}
