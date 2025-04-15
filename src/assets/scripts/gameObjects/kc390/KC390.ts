import { GameObjects, Scene } from 'phaser';

export class KC390 extends GameObjects.Sprite {
  declare body: Phaser.Physics.Arcade.Body; // Declare the body property to be of type Body
  
  constructor(scene: Scene) {
    super(scene, -180, 100, 'kc390');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setVelocityX(180);
  }

  update() {
    if (this.x > 900) {
      this.scene.events.emit('aerialRefueling');
      this.destroy();
    }
  }
}
