export let Gameover = {
  key: 'gameover',
  preload: preload,
  create: create
}

const textStyle = {fontFamily: 'nasa', fill: '#d4d4d4'}

function preload() {
  this.load.image('gameover', 'src/images/screens/gameover.jpg')
}

function create() {
  this.add.image(400, 300, 'gameover')
  this.add.text(300,100, 'Game Over', {fontSize: '32px', ...textStyle})
  this.add.text(150, 300, 'Click ou tecle ENTER para reset', {fontSize: '28px', ...textStyle})

  this.input.on('pointerdown', function () {
    this.input.stopPropagation()
    this.scene.stop('gameover')
    this.scene.start('map1')
}, this)

this.input.keyboard.on('keydown-ENTER', () => {
  this.input.stopPropagation()
  this.scene.stop('gameover')
  this.scene.start('map1')
})
}