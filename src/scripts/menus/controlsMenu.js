export let ControlMenu = {
  key: 'controlmenu',
  preload: preload,
  create: create,
}

const animationConfig = {
  frameRate: 2,
  repeat: -1
}

function preload() {
  this.load.image('menucontrol', 'src/images/screens/controls.jpg')
  this.load.spritesheet('kUp', 'src/images/sprites/keyUp.png', {frameWidth: 32, frameHeight: 32})
  this.load.spritesheet('kDown', 'src/images/sprites/keyDown.png', {frameWidth: 32, frameHeight: 32})
  this.load.spritesheet('kEsc', 'src/images/sprites/keyESC.png', {frameWidth: 32, frameHeight: 32})
  this.load.spritesheet('kS', 'src/images/sprites/keyS.png', {frameWidth: 32, frameHeight: 32})
  this.load.spritesheet('kW', 'src/images/sprites/keyW.png', {frameWidth: 32, frameHeight: 32})
  this.load.spritesheet('kSpace', 'src/images/sprites/keySpace.png', {frameWidth: 64, frameHeight: 32})
}

function create() {
  this.anims.create({
    key:'keyUp',
    frames: this.anims.generateFrameNumbers('kUp', { frames: [0, 1] }),
    ...animationConfig
})
  this.anims.create({
    key:'keyW',
    frames: this.anims.generateFrameNumbers('kW', { frames: [0, 1] }),
    ...animationConfig
  })
  this.anims.create({
    key:'keyDown',
    frames: this.anims.generateFrameNumbers('kDown', { frames: [0, 1] }),
    ...animationConfig
  })
  this.anims.create({
    key:'keyS',
    frames: this.anims.generateFrameNumbers('kS', { frames: [0, 1] }),
    ...animationConfig
  })
  this.anims.create({
    key:'keyEsc',
    frames: this.anims.generateFrameNumbers('kEsc', { frames: [0, 1] }),
    ...animationConfig
  })
  this.anims.create({
    key:'keySpace',
    frames: this.anims.generateFrameNumbers('kSpace', { frames: [0, 1] }),
    ...animationConfig
  })


  this.add.image(400,300,'menucontrol')
  this.add.text(235, 180, 'Controles:', {fontSize: '32px', fontFamily: 'nasa', fill: '#d00'})

  this.add.text(320, 235, 'Mover para cima', {fontSize: '24px', fontFamily: 'nasa', fill: '#d00'})
  this.add.sprite(250,250, '').play('keyUp')
  this.add.sprite(290,250, '').play('keyW')

  this.add.text(320, 285, 'Mover para baixo', {fontSize: '24px', fontFamily: 'nasa', fill: '#d00'})
  this.add.sprite(250,300, '').play('keyDown')
  this.add.sprite(290,300, '').play('keyS')

  this.add.text(320, 335, 'Atirar', {fontSize: '24px', fontFamily: 'nasa', fill: '#d00'})
  this.add.sprite(270,350, '').play('keySpace')

  this.add.text(320, 385, 'Pause', {fontSize: '24px', fontFamily: 'nasa', fill: '#d00'})
  this.add.sprite(270,400, '').play('keyEsc')

  this.input.on('pointerdown', function () {
    this.input.stopPropagation()
    this.scene.stop('controlmenu')
    this.scene.start('mainmenu')
}, this)

  this.add.text(280, 550, 'Click para voltar!', {fontSize: '32px', fontFamily:'nasa', fill: '#fff'})
}
