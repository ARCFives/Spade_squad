export interface IPlanesConfig {
  id: string;
  name: string;
  initial_ammo: number;
  ammo_upgrade: number;
  max_ammo: number;
  initial_missile: number;
  max_missile: number;
  speed: number;
  max_speed: number;
  fuel_consuption: number;
  fuel_effiency: number;
  fly_animation: string;
  engine_sound: string;
  muzzleFlash_X: number;
  muzzleFlash_Y: number;
  misssileAttached_X: number;
  misssileAttached_Y: number;
  main_gun_fire_X: number;
  main_gun_fire_y: number;
  origin_X: number;
  origin_Y: number;
  name_menu_x: number;
  menu_selection_fuel: number;
  menu_selection_speed: number;
  menu_selection_weapons: number;
  menu_selection_sprite: number;
}
