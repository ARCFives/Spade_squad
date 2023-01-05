let game, player, shoots, speed, shootAudio, lastFired = 0, keyboard, engineAudio, ammunitionCount = 50, ammunitionText, ammoBox, 
ammoCheckCollider, fuelBar, fuelConsu = 100, fuelInterval, fuelGallon, fuelCheckCollider, ammoTimer, fuelTimer, warningAudio, shootCollider

function preload() {
  this.load.image('sky', 'src/images/background/map1.png')
  this.load.image('shoot', 'src/images/sprites/shoot.png')
  this.load.image('ammo', 'src/images/sprites/ammunition-box.png')
  this.load.image('ammoIcon', 'src/images/HUD/ammoIcon.png')
  this.load.image('fuelIcon', 'src/images/HUD/fuelCan.png')
  this.load.image('fuelBack', 'src/images/HUD/fuelBarBackground.png')
  this.load.image('fuelBar', 'src/images/HUD/fuelBar.png')
  this.load.image('fuelGallon', 'src/images/sprites/fuel-gallon.png')
  this.load.spritesheet('explosion', 'src/images/sprites/explosion.png', {
    frameWidth: 100,
    frameHeight: 100
  })
  this.load.spritesheet('plane', 'src/images/sprites/plane.png', {
    frameWidth: 74,
    frameHeight: 20
  })
  this.load.audio('shootAudio', 'src/audio/shoot.WAV')
  this.load.audio('engineSound', 'src/audio/engine.wav')
  this.load.audio('alertSound', 'src/audio/warning.wav')
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
  // Animation Plane and Explosion
  this.anims.create({
    key: 'fly',
    frames: this.anims.generateFrameNumbers('plane', { frames: [0, 1] }),
    frameRate: 10,
    repeat: -1
  })
  this.anims.create({
    key: 'fire',
    frames: this.anims.generateFrameNumbers('plane', { frames: [2, 3, 4] }),
    frameRate: 60
  })
  this.anims.create({
    key: 'explosion',
    frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 19}),
    frameRate: 30,
    hideOnComplete: true
  })

  // Sound attributes
  engineAudio = this.sound.add('engineSound').setLoop(true)
  engineAudio.play({ volume: 0.5 })
  shootAudio = this.sound.add('shootAudio')
  warningAudio = this.sound.add('alertSound').setLoop(true)
  // Key configurations
  keyboard = {
    keyS: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
    keyW: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
    keySpace: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    keyUp: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
    keyDown: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
  }
  speed = Phaser.Math.GetSpeed(1, 300)

  // Fuel system
  this.add.image(660, 14, 'fuelIcon')
  let fuelBackground = this.add.image(720, 16, 'fuelBack')

  fuelBar = this.add.image(fuelBackground.x - 50, fuelBackground.y, 'fuelBar').setOrigin(0, 0.5)

  fuelInterval = setInterval(() => {
    fuelConsu -= 5
  }, 5000)

  const FuelGallon = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,

    initialize: function FuelGallon(scene) {
      Phaser.GameObjects.Image.call(this, scene, 0, 0, 'fuelGallon')
      this.speed = Phaser.Math.GetSpeed(150, 1)
    },

    create: function () {
      let y = Math.random() * (280 - 40) + 40
      this.setPosition(790, y)
      this.setActive(true)
      this.setVisible(true)
    },

    update: function (time, delta) {
      this.x -= this.speed * delta
      if (this.x < 20) {
        this.setActive(false)
        this.setVisible(false)
      }
    }
  })

  fuelGallon = this.physics.add.group({
    classType: FuelGallon,
    maxSize: 1,
    runChildUpdate: true,
  })

  fuelTimer = setInterval(() => {
    let fuelCan = fuelGallon.get()
    if(fuelCan) {
      fuelCan.create()
    }
  }, 8000)

  fuelCheckCollider = (player, fuelGallon) => {
    if(player.active === true && fuelGallon.active === true){
      fuelGallon.setActive(false).setVisible(false)
      fuelConsu = 100
    }
  }

  // Ammo System
  this.add.image(16, 16, 'ammoIcon')
  ammunitionText = this.add.text(24, 10, `${ammunitionCount}`, {
    fontFamily: 'nasa',
    fontSize: '14px',
    fill: '#000'
  })

  const AmmoBox = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,

    initialize: function AmmoBox(scene) {
      Phaser.GameObjects.Image.call(this, scene, 0, 0, 'ammo')
      this.speed = Phaser.Math.GetSpeed(150, 1)
    },

    create: function () {
      let y = Math.random() * (580 - 80) + 80
      this.setPosition(790, y)
      this.setActive(true)
      this.setVisible(true)
    },

    update: function (time, delta) {
      this.x -= this.speed * delta
      if (this.x < 20) {
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

  ammoTimer = setInterval(() => {
    let ammunition = ammoBox.get()
    if (ammunition) {
      ammunition.create()
    }
  }, 8000)

  ammoCheckCollider = (player, ammo) => {
    if(player.active === true && ammo.active === true) {
      ammunitionCount += 25
      ammunitionText.setText(`${ammunitionCount}`)
      ammo.setActive(false).setVisible(false)
    }
  }

  // Player sprites and config
  player = this.physics.add.sprite(40, 300, 'player')
  player.setCollideWorldBounds(true).play('fly')

  // Fire system
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

  shoots = this.physics.add.group({
    classType: Shoot,
    runChildUpdate: true
  })
  
  shootCollider = (shoot, object) => {
    let x = object.x
    let y = object.y
    if(shoot.active === true && object.active === true){
      this.add.sprite(x, y).play('explosion')
      object.setActive(false).setVisible(false)
      shoot.setActive(false).setVisible(false)
    }}

  // Physics player, shoot, ammobox, fuelgallon and enemy
  this.physics.add.collider(shoots, ammoBox, shootCollider)
  this.physics.add.collider(shoots, fuelGallon, shootCollider)
  this.physics.add.overlap(player, fuelGallon, fuelCheckCollider, null, this)
  this.physics.add.overlap(player, ammoBox, ammoCheckCollider, null, this)
}

function update(time, delta) {
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
      clearInterval(fuelInterval)
    }
    fuelBar.setDisplaySize(fuelConsu, 5)
  }
  if (fuelConsu == 20) {
    warningAudio.play({ volume: 0.5 })
  }
  if (fuelConsu > 20) {
    warningAudio.stop()
  }
}

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: 'black',
  pixelArt: true,
  title: 'Defend Border',
  version: 'V0.5',
  physics: {
    default: 'arcade'
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
}
  game = new Phaser.Game(config)