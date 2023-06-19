import Phaser from 'phaser'
import { engineAudio, warningAudio } from '../scenes/Amazon'

export class MenuPause extends Phaser.Scene {
  styleButtons = {
    fontFamily: 'nasa',
    fontSize: '32px',
    color: '#6a6a6a'
  }

  constructor() {
    super({ key: 'MenuPause' })
  }

  create() {
    let resumeButton = this.add
      .text(300, 230, `Continuar`, { ...this.styleButtons })
      .setInteractive()
    resumeButton.on('pointerover', () => resumeButton.setColor('#a00'))
    resumeButton.on('pointerout', () => resumeButton.setColor('#6a6a6a'))
    resumeButton.on('pointerup', () => {
      this.input.stopPropagation()
      this.scene.resume('Amazon')
      this.scene.stop('MenuPause')
    })

    let mainMenuButton = this.add
      .text(250, 290, `Menu Principal`, { ...this.styleButtons })
      .setInteractive()
    mainMenuButton.on('pointerover', () => mainMenuButton.setColor('#a00'))
    mainMenuButton.on('pointerout', () => mainMenuButton.setColor('#6a6a6a'))
    mainMenuButton.on('pointerup', () => {
      this.input.stopPropagation()
      this.scene.stop('Amazon')
      this.scene.stop('MenuPause')
      engineAudio.stop()
      warningAudio.stop()
      this.scene.start('MainMenu')
    })
  }
}
