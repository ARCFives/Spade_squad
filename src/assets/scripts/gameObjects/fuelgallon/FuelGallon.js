import Phaser from 'phaser';

export class FuelGallon extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, 790, Math.random() * (280 - 40) + 40, 'gallon');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setVelocityX(-120);
  }

  update() {
    if (this.x < 0) this.destroy();
  }
}
