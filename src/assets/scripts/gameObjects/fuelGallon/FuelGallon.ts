import { SPAWN_X_POSITION } from 'assets/utils/constants_variables';
import { randomSpawn } from 'assets/utils/randomSpawn';
import { GameObjects, Scene } from 'phaser';

export class FuelGallon extends GameObjects.Sprite  {
  declare body: Phaser.Physics.Arcade.Body; // Declare the body property to be of type Body

  constructor(scene: Scene) {
    super(scene, SPAWN_X_POSITION, randomSpawn(40, 280), 'gallon');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setVelocityX(-120);
  }

  update() {
    if (this.x < 0) this.destroy();
  }
}