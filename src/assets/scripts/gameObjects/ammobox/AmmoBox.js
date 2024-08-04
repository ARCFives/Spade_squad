import Phaser from 'phaser';

export class AmmoBox extends Phaser.GameObjects.Sprite {
  constructor(scene, box) {
    super(scene, 790, Math.random() * (280 - 40) + 40, box);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setVelocityX(-150);
  }

  update() {
    if (this.x < 0) this.destroy();
  }
}
