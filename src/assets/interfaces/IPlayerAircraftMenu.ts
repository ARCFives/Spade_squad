import { GameObjects } from 'phaser';

export interface IPlayerAircraftMenu {
  aircraft_sprite: GameObjects.Sprite;
  arrow_next_sprite: GameObjects.Sprite;
  arrow_prev_sprite: GameObjects.Sprite;
  aircraft_fuel: GameObjects.Sprite;
  aircraft_speed: GameObjects.Sprite;
  aircraft_guns: GameObjects.Sprite;
  aircraft_name: GameObjects.Text;
}
