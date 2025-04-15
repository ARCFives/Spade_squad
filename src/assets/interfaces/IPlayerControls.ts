import { Input } from 'phaser';

export interface IPlayerControls {
    up: Input.Keyboard.Key,
    down: Input.Keyboard.Key,
    left: Input.Keyboard.Key,
    right: Input.Keyboard.Key,
    shoot: Input.Keyboard.Key,
    missileShoot: Input.Keyboard.Key,
    airRefueling: Input.Keyboard.Key,
    pause: Input.Keyboard.Key,
    W: Input.Keyboard.Key,
    S: Input.Keyboard.Key,
    D: Input.Keyboard.Key,
    A: Input.Keyboard.Key,
}