import Phaser from 'phaser';
export class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    let randomSpawn = Math.random() * (580 - 40) + 40;
    super(scene, 790, randomSpawn, 'enemy');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.speed = Phaser.Math.Between(50, 120);
    this.play('enemyFly');
    this.body.setVelocityX(-this.speed);
  }

  update() {
    if (this.x < 0) {
      this.scene.events.emit('enemyPass');
      this.destroy();
    }
  }
}
