let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  title: 'Defend Border',
  version: 'V0.3',
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
let player, cursors, shoots, speed, shootFire, lastFired = 0, keyboard, engineAudio, ammunitionCount = 50, ammunitionText, ammo, ammoCheck, ammoGet

function preload() {
  this.load.image('sky', 'src/images/background/map1.png')
  this.load.image('shoot', 'src/images/sprites/shoot.png')
  this.load.image('ammo', 'src/images/sprites/ammunition-box.png')
  this.load.image('ammoIcon', 'src/images/sprites/ammoIcon.png')
  this.load.spritesheet('plane', 'src/images/sprites/plane.png', {
    frameWidth: 74,
    frameHeight: 20
  })
  this.load.audio('shootAudio', 'src/audio/shoot.WAV')
  this.load.audio('engineSound', 'src/audio/engine.wav')
}

function create() {
  //background Scene
  this.background = this.add.tileSprite(400, 300, config.width, config.height, 'sky')
  //Animation Plane
  this.anims.create({
    key: 'fly',
    frames: this.anims.generateFrameNumbers('plane', { frames: [0, 1] }),
    frameRate: 10,
    repeat: -1,
  })
  this.anims.create({
    key:'fire',
    frames: this.anims.generateFrameNumbers('plane', { frames: [2, 4] }),
    frameRate: 60
  })

  //variables attributes
  engineAudio = this.sound.add('engineSound')
  engineAudio.loop = true
  engineAudio.play({volume: 0.4})
  cursors = this.input.keyboard.createCursorKeys()
  keyboard = {keyS:this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S), keyW:this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)}
  speed = Phaser.Math.GetSpeed(1, 300)
  shootFire = this.sound.add('shootAudio')
  this.add.image(16,16, 'ammoIcon')
  ammunitionText = this.add.text(24, 10, `${ammunitionCount}`, {fontFamily: 'nasa', fontSize: '14px', fill: '#000' })
  player = this.physics.add.sprite(40, 300, 'player')
  player.setCollideWorldBounds(true)
  player.play('fly')

  //shoot Class
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
    maxSize: 12,
    runChildUpdate: true
  })

  //Ammo Class
  const AmmoBox = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,

    initialize: function AmmoBox(scene) {
      Phaser.GameObjects.Image.call(this, scene, 0, 0, 'ammo')
      this.speed = Phaser.Math.GetSpeed(150, 1)
    },

    create: function () {
      let y = Math.random() * (400 - 1) + 1
      this.setPosition(780, y)
      this.setActive(true)
      this.setVisible(true)
    },

    update: function (time, delta) {
      this.x -= this.speed * delta
      if (this.x < 20) {
        ammoGet = false
        this.setActive(false)
        this.setVisible(false)
      }
    }
  })
  ammo = this.physics.add.group({
    classType: AmmoBox,
    maxSize: 1,
    runChildUpdate: true
  })

  //interval create ammobox
  setInterval(() => {
    let ammunition = ammo.get()
    if(ammunition) {
      ammunition.create()
      ammoGet = true
    }
  }, 8000)

  ammoCheck = function checkAmmoCollider(player, ammo) {
      if(ammoGet){
        ammunitionCount += 25
        ammunitionText.setText(`${ammunitionCount}`)
        ammo.setActive(false).setVisible(false)
        ammoGet = false
      }
  }

}

function update(time, delta) {
  //check collision player and ammo
  this.physics.add.overlap(ammo, player, ammoCheck, null, this)
  //background move
  this.background.tilePositionX += 0.5
  //controls
  if (cursors.down.isDown || keyboard.keyS.isDown) {
    player.setVelocityY(+150)
  } else if (cursors.up.isDown || keyboard.keyW.isDown) {
    player.setVelocityY(-150)
  } else {
    player.setVelocityY(0)
  } 
  if (cursors.space.isDown && time > lastFired && ammunitionCount > 0) {
    let bullet = shoots.get()
    if (bullet) {
      player.play('fire').once('animationcomplete', () => {
        player.play("fly")})
      ammunitionCount -= 1
      ammunitionText.setText(`${ammunitionCount}`)
      bullet.fire(player.x, player.y)
      shootFire.play()
      lastFired = time + 50
    }}
    if(ammunitionCount < 15) {
      ammunitionText.setFill('red')
    }else {
      ammunitionText.setFill('#000')
    }
}
