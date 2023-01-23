import { config } from '../game.js'

export let mainMenu = {
  key: 'mainmenu',
  preload: preload,
  create: create
}

function preload() {
  let progressBar = this.add.graphics()
  let progressBox = this.add.graphics()
  let loadingText = this.make.text({
    x: 315,
    y: 220,
    text: 'Carrengando...',
    style: {
        font: '20px nasa',
        fill: '#ffffff'
    }
})
  progressBox.fillStyle(0x222222, 0.8)
  progressBox.fillRect(240, 270, 320, 50)
  
  this.load.on('progress', function (value) {
    progressBar.clear()
    progressBar.fillStyle(0xffffff, 1)
    progressBar.fillRect(250, 280, 300 * value, 30)
})         
  this.load.on('complete', function () {
    progressBar.destroy()
    progressBox.destroy()
    loadingText.destroy()
})
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
