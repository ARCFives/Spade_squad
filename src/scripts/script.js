import { Amazon } from './scenes/Amazon.js'
import { Menu } from './menus/pauseMenu.js'
import { Gameover } from './menus/gameover.js'
import { mainMenu } from './menus/mainMenu.js'
import { ControlMenu } from './menus/controlsMenu.js'
import Phaser from 'phaser'

let game
export let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#000000',
  pixelArt: true,
  title: 'Spade squad',
  version: '1.0.1',
  physics: {
    default: 'arcade',
    debug: false
  },
  scene: [mainMenu, ControlMenu, Amazon, Menu, Gameover]
}
game = new Phaser.Game(config)