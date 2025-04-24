export default class SoundManager {
  constructor (scene) {
    this.scene = scene;
    this.isMuted = false; // Keeps track of the mute state
  }

  mute () {
    this.scene.sound.mute = true;
    this.isMuted = true;
  }

  unmute () {
    this.scene.sound.mute = false;
    this.isMuted = false;
  }

  toggleMute () {
    this.isMuted ? this.unmute() : this.mute();
  }
}
