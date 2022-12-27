let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: 'arcade',
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
}

let game = new Phaser.Game(config)
let player, cursors, shoots, speed, shootFire, lastFired = 0, keyDownW

function preload() {
  this.load.image('sky', 'src/images/scene.png')
  this.load.image('shoot', 'src/images/shoot.png')
  this.load.spritesheet('player', 'src/images/plane.png', {
    frameWidth: 74,
    frameHeight: 20
  })
  this.load.audio('shootAudio', 'src/audio/shoot.WAV')
}

function create() {
  this.add.image(400, 300, 'sky')
  this.anims.create({
    key: 'fly',
    frames: this.anims.generateFrameNumbers('player', { frames: [0, 1] }),
    frameRate: 8,
    repeat: -1,
  })
  this.anims.create({
    key:'fire',
    frames: this.anims.generateFrameNumbers('player', { frames: [2, 4] }),
    frameRate: 8,
  })

  keyDownW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
  speed = Phaser.Math.GetSpeed(1, 300)
  shootFire = this.sound.add('shootAudio')
  player = this.physics.add.sprite(40, 300, 'player')
  player.setCollideWorldBounds(true)
  player.play('fly')

  const Shoot = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,

    initialize: function Shoot(scene) {
      Phaser.GameObjects.Image.call(this, scene, 0, 0, 'shoot')
      this.speed = Phaser.Math.GetSpeed(350, 1)
    },

    fire: function (x, y) {
      this.setPosition(x + 42, y + 5)
      this.setActive(true)
      this.setVisible(true)
    },

    update: function (time, delta) {
      this.x += this.speed * delta
      if (this.x > 800) {
        this.setActive(false)
        this.setVisible(false)
      }
    }
  })

  shoots = this.add.group({
    classType: Shoot,
    maxSize: 10,
    runChildUpdate: true
  })

  cursors = this.input.keyboard.createCursorKeys()
}

function update(time, delta) {
  if (cursors.down.isDown) {
    player.setVelocityY(+150)
  } else if (cursors.up.isDown || keyDownW.isDown) {
    player.setVelocityY(-150)
  } else if (cursors.space.isDown && time > lastFired) {
    let bullet = shoots.get()
    if (bullet) {
      bullet.fire(player.x, player.y)
      shootFire.play()
      lastFired = time + 50
    }
  } else {
    player.setVelocityY(0)
  }
}
