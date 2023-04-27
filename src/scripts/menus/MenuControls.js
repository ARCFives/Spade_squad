import Phaser from "phaser"

export class MenuControl extends Phaser.Scene {
  
  animationConfig = {
    frameRate: 2,
    repeat: -1
  }

  constructor(){
    super({key: 'MenuControl'})
  }

  create() {
    this.anims.create({
      key:'keyUp',
      frames: this.anims.generateFrameNumbers('kUp', { frames: [0, 1] }),
      ...this.animationConfig
  })
    this.anims.create({
      key:'keyW',
      frames: this.anims.generateFrameNumbers('kW', { frames: [0, 1] }),
      ...this.animationConfig
    })
    this.anims.create({
      key:'keyDown',
      frames: this.anims.generateFrameNumbers('kDown', { frames: [0, 1] }),
      ...this.animationConfig
    })
    this.anims.create({
      key:'keyS',
      frames: this.anims.generateFrameNumbers('kS', { frames: [0, 1] }),
      ...this.animationConfig
    })
    this.anims.create({
      key:'keyEsc',
      frames: this.anims.generateFrameNumbers('kEsc', { frames: [0, 1] }),
      ...this.animationConfig
    })
    this.anims.create({
      key:'keySpace',
      frames: this.anims.generateFrameNumbers('kSpace', { frames: [0, 1] }),
      ...this.animationConfig
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
      this.scene.stop('MenuControl')
      this.scene.start('MainMenu')
  }, this)
  
    this.add.text(280, 550, 'Click para voltar!', {fontSize: '32px', fontFamily:'nasa', fill: '#fff'})
  }
}