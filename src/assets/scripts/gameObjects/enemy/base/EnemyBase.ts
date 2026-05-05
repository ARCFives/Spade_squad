import { IEnemyConfig } from 'assets/interfaces/IEnemyConfig';
import { BaseScene } from 'assets/scripts/scenes/base/Base_Scene';
import { SPAWN_X_POSITION } from 'assets/utils/constants_variables';
import { randomSpawn } from 'assets/utils/randomSpawn';
import { randomSpeedEnemy } from 'assets/utils/randomSpeedEnemy';
import { GameObjects } from 'phaser';

export abstract class EnemyBase extends GameObjects.Sprite {
  declare body: Phaser.Physics.Arcade.Body; // Declare the body property to be of type Body
  declare scene: BaseScene; // Declare the scene property to be of type class BaseScene
  private speed: number;
  private maxHp: number;
  private currentHp: number;

  constructor(scene: BaseScene, config: IEnemyConfig) {
    super(
      scene,
      SPAWN_X_POSITION,
      randomSpawn(config.origin_min_Y, config.origin_max_y),
      config.enemy,
    );
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.play(`${config.enemy}_move`);
    this.speed = randomSpeedEnemy(config.speedMin, config.speedMax);
    this.body.setVelocityX(-this.speed);
    this.maxHp = this.getHpByType(config.type, config.hp);
    this.currentHp = this.maxHp;
  }

  protected abstract movement(): boolean | undefined;

  public takeDamage(damage: number) {
    this.currentHp -= damage;
    if (this.currentHp <= 0) {
      this.die();
    }
  }

  private die() {
    this.scene.add.sprite(this.x, this.y, 'explosion').play('explosion');
    this.scene.sound.play(this.scene.explosionSoundRandom());
    this.scene.events.emit('enemyDestroy', 100);
    this.destroy();
  }

  private getHpByType(
    enemyType: IEnemyConfig['type'],
    enemyHp: IEnemyConfig['hp'],
  ): number {
    const config = {
      air: {
        light: 10,
        medium: 20,
        heavy: 30,
      },
      ground: {
        light: 5,
        medium: 10,
        heavy: 30,
      },
      naval: {
        light: 5,
        medium: 15,
        heavy: 25,
      },
    };

    return config[enemyType][enemyHp] || 10;
  }
}
