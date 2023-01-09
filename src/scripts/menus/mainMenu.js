import { config } from '../game.js'

export let mainMenu = {
  key: 'mainmenu',
  preload: preload,
  create: create
}

function preload() {
  this.load.image('background', 'src/images/screens/mainmenu.jpg')
}

function create() {
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

  let startButton = this.add.text(360, 230, 'Iniciar', {
      fontFamily: 'nasa',
      fontSize: '32px',
      fill: '#800'
    }).setInteractive()
  startButton.on('pointerover', () => startButton.setColor('#f00'))
  startButton.on('pointerout', () => startButton.setColor('#800'))
  startButton.on('pointerup', () => {
    this.input.stopPropagation()
    this.scene.stop('mainmenu')
    this.scene.start('map1')
  })

  let controlsButton = this.add.text(330, 290, 'Controles', {
      fontFamily: 'nasa',
      fontSize: '32px',
      fill: '#800'
    }).setInteractive()
  controlsButton.on('pointerover', () => controlsButton.setColor('#f00'))
  controlsButton.on('pointerout', () => controlsButton.setColor('#800'))
  controlsButton.on('pointerup', () => {
    this.input.stopPropagation()
    this.scene.stop('mainmenu')
    this.scene.start('controlmenu')
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
