import Phaser from 'phaser';
export class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, 790, Math.random() * (580 - 40) + 40, 'enemy');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.speed = Phaser.Math.Between(50, 120);
    this.play('enemyFly');
    this.body.setVelocityX(-this.speed);
  }

  update() {
    if (this.x < 0) {
      this.destroy();
      console.log('gameover');
    }
  }
}
