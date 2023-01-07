import { Map1 } from "./scenes/map1.js"
import { Menu } from "./menus/pauseMenu.js"
import { Gameover } from "./menus/gameover.js"

let game
let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#000000',
  pixelArt: true,
  title: 'Spade squad',
  version: '1.0.0',
  physics: {
    default: 'arcade',
    debug: false
  },
  scene: [Map1, Menu, Gameover]
}
  game = new Phaser.Game(config)