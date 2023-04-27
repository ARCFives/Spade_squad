import { config } from '../base/gameConfig.js'
import Phaser from 'phaser'

export class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenu' })
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

  }

  create() {
    this.add.image(400, 300, 'background')
    this.add.text(115, 80, `${config.title}`, {
      fontSize: '64px',
      fontFamily: 'targent',
      fill: '#222'
    })
    this.add.text(750, 580, `V${config.version}`, {
      fontFamily: 'nasa',
      fill: '#222'
    })

    let startButton = this.add
      .text(360, 230, 'Iniciar', {
        fontFamily: 'nasa',
        fontSize: '32px',
        fill: '#800'
      })
      .setInteractive()
    startButton.on('pointerover', () => startButton.setColor('#f00'))
    startButton.on('pointerout', () => startButton.setColor('#800'))
    startButton.on('pointerup', () => {
      this.input.stopPropagation()
      this.scene.stop('MainMenu')
      this.scene.start('Amazon')
    })

    let controlsButton = this.add
      .text(330, 290, 'Controles', {
        fontFamily: 'nasa',
        fontSize: '32px',
        fill: '#800'
      })
      .setInteractive()
    controlsButton.on('pointerover', () => controlsButton.setColor('#f00'))
    controlsButton.on('pointerout', () => controlsButton.setColor('#800'))
    controlsButton.on('pointerup', () => {
      this.input.stopPropagation()
      this.scene.stop('MainMenu')
      this.scene.start('MenuControl')
    })

    this.add.text(650, 200, 'Pontuação', {
      fontFamily: 'nasa',
      fill: '#333',
      fontSize: '24px'
    })
    this.add.text(
      670,
      230,
      `${localStorage.score ? localStorage.getItem('score') : '0000000'}`,
      { fontFamily: 'nasa', fill: '#555', fontSize: '20px' }
    )
  }
}
