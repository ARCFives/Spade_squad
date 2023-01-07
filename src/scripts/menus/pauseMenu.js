export let Menu = {
  key: 'menu',
  preload: preload,
  create: create
}

function preload() {}

function create() {
  let resumeButton = this.add.text(320, 180, `Continuar`, {
      fontFamily: 'nasa',
      fontSize: '32px',
      color: '#6a6a6a'
    }).setInteractive()

  resumeButton.on('pointerover', () => resumeButton.setColor('#f00'))
  resumeButton.on('pointerout', () => resumeButton.setColor('#6a6a6a'))
  resumeButton.on('pointerup', () => {
      this.input.stopPropagation()
      this.scene.resume('map1')
      this.scene.stop('menu')
  })
}
