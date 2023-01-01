let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: 'black',
  pixelArt: true,
  title: 'Defend Border',
  version: 'V0.3',
  physics: {
    default: 'arcade'
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
}

let game = new Phaser.Game(config)
let player, shoots, speed, shootAudio, lastFired = 0, keyboard, engineAudio, ammunitionCount = 50, ammunitionText, ammoBox, 
ammoCheckCollider, ammoFlag, fuelBar, fuelConsu = 100, fueldelay

function preload() {
  this.load.image('sky', 'src/images/background/map1.png')
  this.load.image('shoot', 'src/images/sprites/shoot.png')
  this.load.image('ammo', 'src/images/sprites/ammunition-box.png')
  this.load.image('ammoIcon', 'src/images/HUD/ammoIcon.png')
  this.load.image('fuelIcon', 'src/images/HUD/fuelCan.png')
  this.load.image('fuelBack', 'src/images/HUD/fuelBarBackground.png')
  this.load.image('fuelBar', 'src/images/HUD/fuelBar.png')
  this.load.spritesheet('plane', 'src/images/sprites/plane.png', {
    frameWidth: 74,
    frameHeight: 20
  })
  this.load.audio('shootAudio', 'src/audio/shoot.WAV')
  this.load.audio('engineSound', 'src/audio/engine.wav')
}

function create() {
  // Background Scene
  this.background = this.add.tileSprite(
    400,
    300,
    config.width,
    config.height,
    'sky'
  )
  // Animation Plane
  this.anims.create({
    key: 'fly',
    frames: this.anims.generateFrameNumbers('plane', { frames: [0, 1] }),
    frameRate: 10,
    repeat: -1
  })
  this.anims.create({
    key: 'fire',
    frames: this.anims.generateFrameNumbers('plane', { frames: [2, 4] }),
    frameRate: 60
  })
  // Sound attributes
  engineAudio = this.sound.add('engineSound').setLoop(true)
  engineAudio.play({ volume: 0.5 })
  shootAudio = this.sound.add('shootAudio')
  // Key configurations
  keyboard = {
    keyS: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
    keyW: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
    keySpace: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    keyUp: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
    keyDown: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
  }
  speed = Phaser.Math.GetSpeed(1, 300)
  //fuel icons and system
  this.add.image(660, 14, 'fuelIcon')
  let fuelBackground = this.add.image(720, 16, 'fuelBack')
  fuelBar = this.add
    .image(fuelBackground.x - 50, fuelBackground.y, 'fuelBar')
    .setOrigin(0, 0.5)
  fueldelay = setInterval(() => {
    fuelConsu -= 5
  }, 5000)
  ammoCheckCollider = (player, ammo) => {
    if (ammoFlag) {
      ammunitionCount += 25
      ammunitionText.setText(`${ammunitionCount}`)
      ammo.setActive(false).setVisible(false)
      ammoFlag = false
    }
  }
  //ammo icons
  this.add.image(16, 16, 'ammoIcon')
  ammunitionText = this.add.text(24, 10, `${ammunitionCount}`, {
    fontFamily: 'nasa',
    fontSize: '14px',
    fill: '#000'
  })
  //player sprites
  player = this.physics.add.sprite(40, 300, 'player')
  player.setCollideWorldBounds(true).play('fly')
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
        ammoFlag = false
        this.setActive(false)
        this.setVisible(false)
      }
    }
  })
  ammoBox = this.physics.add.group({
    classType: AmmoBox,
    maxSize: 1,
    runChildUpdate: true
  })

  //interval create ammobox
  setInterval(() => {
    let ammunition = ammoBox.get()
    if (ammunition) {
      ammunition.create()
      ammoFlag = true
    }
  }, 8000)
}

function update(time, delta) {
  // Check collision player and ammo
  this.physics.add.overlap(ammoBox, player, ammoCheckCollider, null, this)
  // Background move
  this.background.tilePositionX += 0.5
  // Controls move and fire
  if (keyboard.keyDown.isDown || keyboard.keyS.isDown) {
    player.setVelocityY(+150)
  } else if (keyboard.keyUp.isDown || keyboard.keyW.isDown) {
    player.setVelocityY(-150)
  } else {
    player.setVelocityY(0)
  }
  if (keyboard.keySpace.isDown && time > lastFired && ammunitionCount > 0) {
    let bullet = shoots.get()
    if (bullet) {
      player.play('fire').once('animationcomplete', () => {
        player.play('fly')
      })
      ammunitionCount -= 1
      ammunitionText.setText(`${ammunitionCount}`)
      bullet.fire(player.x, player.y)
      shootAudio.play()
      lastFired = time + 50
    }
  }
  // Check ammo count
  if (ammunitionCount < 15) {
    ammunitionText.setFill('red')
  } else {
    ammunitionText.setFill('#000')
  }
  // Check fuel level
  if (fuelConsu >= 0) {
    if (fuelConsu == 0) {
      clearInterval(fueldelay)
    }
    fuelBar.setDisplaySize(fuelConsu, 5)
  }
}