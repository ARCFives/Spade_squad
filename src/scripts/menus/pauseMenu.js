export let Menu = {
  key: 'menu',
  preload: preload,
  create: create
}

function preload () {
}

function create() {

this.add.text(400, 300, `Pausado`, {
    fontFamily: 'nasa',
    fontSize: '32px',
    fill: '#fff',
    color: 'white'
  })
  
  
  this.input.on('pointerdown', function () {
    
    this.input.stopPropagation()
    this.scene.resume('map1')
    this.scene.stop('menu')

}, this);
}