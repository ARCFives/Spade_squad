import Phaser from "phaser"

export class Preload extends Phaser.Scene {
  constructor() {
    super({key: 'Preload'})
  }

  preload() {
    let progressBar = this.add.graphics()
    let progressBox = this.add.graphics()
    let loadingText = this.make.text({
      x: 315,
      y: 450,
      text: 'Carrengando...',
      style: {
        font: '20px nasa',
        fill: '#ffffff'
      }
    })
    progressBox.fillStyle(0x222222, 0.8)
    progressBox.fillRect(240, 480, 320, 12)

    this.load.on('progress', function (value) {
      progressBar.clear()
      progressBar.fillStyle(0x880000, 1)
      progressBar.fillRect(240, 480, 300 * value, 12)
    })
    this.load.on('complete', function () {
      progressBar.destroy()
      progressBox.destroy()
      loadingText.destroy()
      
    })

    this.load.image('background', 'src/images/screens/mainmenu.jpg')
    this.load.image('sky', 'src/images/background/map1.png')
    this.load.image('shoot', 'src/images/sprites/shoot.png')
    this.load.image('ammo', 'src/images/sprites/ammunition-box.png')
    this.load.image('ammoIcon', 'src/images/HUD/ammoIcon.png')
    this.load.image('fuelIcon', 'src/images/HUD/fuelCan.png')
    this.load.image('fuelBack', 'src/images/HUD/fuelBarBackground.png')
    this.load.image('fuelBar', 'src/images/HUD/fuelBar.png')
    this.load.image('fuelGallon', 'src/images/sprites/fuel-gallon.png')
    this.load.image('gameover', 'src/images/screens/gameover.jpg')
    this.load.image('menucontrol', 'src/images/screens/controls.jpg')
    this.load.spritesheet('explosion', 'src/images/sprites/explosion.png', {
      frameWidth: 100,
      frameHeight: 100
    })
    this.load.spritesheet('plane', 'src/images/sprites/a29.png', {
      frameWidth: 74,
      frameHeight: 20
    })
    this.load.spritesheet('enemy', 'src/images/sprites/cessna.png', {
      frameWidth: 80,
      frameHeight: 28
    })
    this.load.spritesheet('kUp', 'src/images/sprites/keyUp.png', {frameWidth: 32, frameHeight: 32})
    this.load.spritesheet('kDown', 'src/images/sprites/keyDown.png', {frameWidth: 32, frameHeight: 32})
    this.load.spritesheet('kEsc', 'src/images/sprites/keyESC.png', {frameWidth: 32, frameHeight: 32})
    this.load.spritesheet('kS', 'src/images/sprites/keyS.png', {frameWidth: 32, frameHeight: 32})
    this.load.spritesheet('kW', 'src/images/sprites/keyW.png', {frameWidth: 32, frameHeight: 32})
    this.load.spritesheet('kSpace', 'src/images/sprites/keySpace.png', {frameWidth: 64, frameHeight: 32})
    this.load.audio('shootAudio', 'src/audio/shoot.WAV')
    this.load.audio('engineSound', 'src/audio/engine.wav')
    this.load.audio('alertSound', 'src/audio/warning.wav')
  }

  create() {
    this.scene.stop('Preload')
    this.scene.start('MainMenu')
  }

}