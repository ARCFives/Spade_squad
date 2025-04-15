import { SPAWN_X_POSITION } from 'assets/utils/constants_variables';
import { randomSpawn } from 'assets/utils/randomSpawn';
import { randomSpeedEnemy } from 'assets/utils/randomSpeedEnemy';
import { GameObjects, Scene } from 'phaser';

export class Enemy extends GameObjects.Sprite {
  declare body: Phaser.Physics.Arcade.Body; // Declare the body property to be of type Body
  private speed: number;
  
  constructor(scene: Scene, enemyType: string) {
    super(scene, SPAWN_X_POSITION, randomSpawn(40, 580), enemyType);
    scene.add.existing(this);
    scene.physics.add.existing(this); 
    this.speed = randomSpeedEnemy(50, 120); 
    this.play(`${enemyType}Fly`); // Play the enemy animation
    this.body.setVelocityX(-this.speed); 
  }

  update() {
    if (this.x < 0) {
      this.scene.events.emit('enemyPass');
      this.destroy();
    }
  }
}