import Phaser from 'phaser'
export class Gameover extends Phaser.Scene {
  textStyle = { fontFamily: 'nasa', fill: '#d4d4d4' }

  constructor() {
    super({ key: 'Gameover' })
  }

  create() {
    this.add.image(400, 300, 'gameover')
    this.add.text(300, 100, 'Game Over', { fontSize: '32px', ...this.textStyle })
    this.add.text(150, 300, 'Click ou tecle ENTER para reset', {
      fontSize: '28px',
      ...this.textStyle
    })

    this.input.on(
      'pointerdown',
      function () {
        this.input.stopPropagation()
        this.scene.stop('Gameover')
        this.scene.start('Amazon')
      },
      this
    )

    this.input.keyboard.on('keydown-ENTER', () => {
      this.input.stopPropagation()
      this.scene.stop('Gameover')
      this.scene.start('Amazon')
    })
  }
}