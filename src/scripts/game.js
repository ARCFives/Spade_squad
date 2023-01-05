import { Map1 } from "./scenes/map1.js"
import { Menu } from "./menus/pauseMenu.js"

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#000000',
  pixelArt: true,
  title: 'Defend Border',
  version: 'V0.5',
  physics: {
    default: 'arcade'
  },
  scene: [Map1, Menu]
}
  game = new Phaser.Game(config)