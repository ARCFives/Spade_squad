import { Math } from 'phaser';

export function randomSpeedEnemy(minSpeed: number, maxSpeed: number): number {
    return Math.Between(minSpeed, maxSpeed);
}