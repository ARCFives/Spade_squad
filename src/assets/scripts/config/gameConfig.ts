import { Types } from 'phaser';
import { scenesGame } from './scenesManager';

export const gameConfig: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 800,
  height: 600,
  backgroundColor: '#000000',
  pixelArt: true,
  title: 'Spade Squad',
  version: '1.0.0',
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  autoFocus: true,
  scene: scenesGame,
};
