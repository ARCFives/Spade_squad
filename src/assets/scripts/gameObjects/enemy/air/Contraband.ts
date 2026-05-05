import { BaseScene } from 'assets/scripts/scenes/base/Base_Scene';
import { EnemyBase } from '../base/EnemyBase';

export class Contraband extends EnemyBase {
  constructor(scene: BaseScene) {
    super(scene, {
      enemy: 'contraband',
      type: 'air',
      hp: 'light',
      speedMin: 50,
      speedMax: 120,
      origin_min_Y: 40,
      origin_max_y: 580,
    });
  }

  protected movement(): boolean | undefined {
    if (this.x < 0) {
      const count = this.scene.registry.get('violations');
      if (count === 3) {
        return this.scene.events.emit('enemyPass');
      }
      this.scene.sound.play('alarm_violation');
      this.scene.registry.set('violations', count + 1);
      this.scene.events.emit('violation', count + 1);
      this.destroy();
    }
  }

  update() {
    this.movement();
  }
}
