import { GameObjects } from 'phaser';

export interface ISelectionMenuText {
  plane_selection_title: GameObjects.Text;
  aircraft_fuel_text: GameObjects.Text;
  aircraft_speed_text: GameObjects.Text;
  aircraft_weapons_text: GameObjects.Text;
  start_mission: GameObjects.Text;
}

export interface ISelectionMenuLanguage {
  title: string;
  fuel: string;
  speed: string;
  weapons: string;
  start_mission: string;
}
