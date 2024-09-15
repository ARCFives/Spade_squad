import { Amazon } from '../maps/Amazon';
import { ControlsMenu } from '../menus/ControlsMenu';
import { CreditsMenu } from '../menus/CreditsMenu';
import { DevScreen } from '../menus/DevScreen';
import { Gameover } from '../menus/Gameover';
import { MainMenu } from '../menus/MainMenu';
import { PauseMenu } from '../menus/PauseMenu';
import { Preload } from '../menus/Preload';

export const gameConfig = {
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
  scene: [
    Preload,
    DevScreen,
    MainMenu,
    CreditsMenu,
    Amazon,
    PauseMenu,
    Gameover,
    ControlsMenu,
  ],
};
