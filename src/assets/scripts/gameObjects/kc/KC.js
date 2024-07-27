import Phaser from 'phaser';

export class KC extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, -180, 100, 'kc');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.sound.play('airplaneAudio', { volume: 0.2, seek: 4 });
    this.body.setVelocityX(180);
  }

  update() {
    if (this.x > 900) {
      this.scene.events.emit('airFuelSupport');
      this.destroy();
    }
  }
}
