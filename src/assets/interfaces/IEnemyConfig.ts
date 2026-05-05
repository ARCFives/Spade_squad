export interface IEnemyConfig {
  enemy: 'contraband' | 'scout';
  type: 'air' | 'ground' | 'naval';
  hp: 'light' | 'medium' | 'heavy';
  speedMin: number;
  speedMax: number;
  origin_min_Y: number;
  origin_max_y: number;
}
