import { engineAudio, warningAudio } from "../scenes/map1.js"

export let Menu = {
  key: 'menu',
  preload: preload,
  create: create
}

const styleButtons = {
  fontFamily: 'nasa',
  fontSize: '32px',
  color: '#6a6a6a'
}

function preload() {}

function create() {
  let resumeButton = this.add.text(300, 180, `Continuar`, {...styleButtons}).setInteractive()
  resumeButton.on('pointerover', () => resumeButton.setColor('#a00'))
  resumeButton.on('pointerout', () => resumeButton.setColor('#6a6a6a'))
  resumeButton.on('pointerup', () => {
      this.input.stopPropagation()
      this.scene.resume('map1')
      this.scene.stop('menu')
  })

  let mainMenuButton = this.add.text(250, 230, `Menu Principal`, {...styleButtons}).setInteractive()
  mainMenuButton.on('pointerover', () => mainMenuButton.setColor('#a00'))
  mainMenuButton.on('pointerout', () => mainMenuButton.setColor('#6a6a6a'))
  mainMenuButton.on('pointerup', () => {
    this.input.stopPropagation()
    this.scene.stop('map1')
    this.scene.stop('menu')
    engineAudio.stop()
    warningAudio.stop()
    this.scene.start('mainmenu')
  })
}
