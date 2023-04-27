// import { Amazon } from './scenes/Amazon.js'
import { MenuPause } from '../menus/MenuPause.js'
import { Gameover } from '../menus/Gameover.js'
import { MainMenu } from '../menus/MainMenu.js'
import { MenuControl } from '../menus/MenuControls.js'
import { Amazon } from '../scenes/Amazon.js'
import { Preload } from '../menus/Preload.js'
import Phaser from 'phaser'

let game
export let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#000000',
  pixelArt: true,
  title: 'Spade squad',
  version: '1.0.2',
  physics: {
    default: 'arcade',
    debug: false
  },
  scene: [Preload, MainMenu, MenuControl, Amazon, MenuPause, Gameover]
}
game = new Phaser.Game(config)