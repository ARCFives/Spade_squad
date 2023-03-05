import { AmmoBox } from "../gameObjects/ammoSystem/AmmoClass.js"
import { Enemy } from "../gameObjects/enemySystem/EnemyClass.js"
import { FuelGallon } from "../gameObjects/fuelSystem/FuelClass.js"
import { Shoot } from "../gameObjects/shootSystem/ShootClass.js"
import Phaser from "phaser"

let player, shoots, shootAudio, lastFired, keyboard, ammunitionText, ammunitionCount, ammoBoxGroup, fuelBar, fuelGallon, fuelConsu, enemys, enemyDelay, scoreText, score

export let engineAudio, warningAudio, gameover

function preload() {
  let progressBar = this.add.graphics()
  let progressBox = this.add.graphics()
  let loadingText = this.make.text({
    x: 315,
    y: 450,
    text: 'Carrengando...',
    style: {
        font: '20px nasa',
        fill: '#ffffff'
    }
})
  progressBox.fillStyle(0x222222, 0.8)
  progressBox.fillRect(240, 480, 320, 12)
  
  this.load.on('progress', function (value) {
    progressBar.clear()
    progressBar.fillStyle(0x880000, 1)
    progressBar.fillRect(240, 480, 300 * value, 12)
})         
  this.load.on('complete', function () {
    progressBar.destroy()
    progressBox.destroy()
    loadingText.destroy()
})

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
  this.load.spritesheet('plane', 'src/images/sprites/a29.png', {
    frameWidth: 74,
    frameHeight: 20
  })
  this.load.spritesheet('enemy', 'src/images/sprites/cessna.png', {
    frameWidth: 80,
    frameHeight: 28
  })
  this.load.audio('shootAudio', 'src/audio/shoot.WAV')
  this.load.audio('engineSound', 'src/audio/engine.wav')
  this.load.audio('alertSound', 'src/audio/warning.wav')
}

function create() {
  // Variables atrributes
  ammunitionCount = 25
  fuelConsu = 100
  lastFired = 0
  enemyDelay = 2000
  gameover = () => {
    if (localStorage.score == null) {
      localStorage.setItem('score', score)
    }else if (parseInt(localStorage.score) < score) {
      localStorage.setItem('score', score)
    }
    
    this.input.stopPropagation()
    this.scene.stop('Amazon')
    this.scene.start('gameover')
    engineAudio.stop()
    warningAudio.stop()
  }
  score = undefined
  // Background Scene
  this.background = this.add.tileSprite(
    400,
    300,
    800,
    600,
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
    key: 'enemyFly',
    frames: this.anims.generateFrameNumbers('enemy', {frames: [0, 1, 2, 3]}),
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
    keyDown: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
    keyEsc: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
  }

  // Score system
  scoreText = this.add.text(350, 10, `000000`, {
    fontFamily: 'nasa',
    fontSize: '14px',
    fill: '#000'
  })

  // Fuel system
  this.add.image(660, 14, 'fuelIcon')
  let fuelBackground = this.add.image(720, 16, 'fuelBack')

  fuelBar = this.add.image(fuelBackground.x - 50, fuelBackground.y, 'fuelBar').setOrigin(0, 0.5)

  const fuelInterval = this.time.addEvent({ delay: 5000, callback: consumeFuel, callbackScope: this, loop: true })

  function consumeFuel() {
    fuelConsu -= 5
  }

  fuelGallon = this.physics.add.group({
    classType: FuelGallon,
    maxSize: 1,
    runChildUpdate: true,
  })

  const fuelTimer = this.time.addEvent({delay:30000, callback: createFuelGallon, callbackScope: this, loop: true})

  function createFuelGallon() {
    let fuelCan = fuelGallon.get()
    if(fuelCan) {
      fuelCan.create()
    }
  }

  function fuelCheckCollider (player, fuelGallon) {
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

  ammoBoxGroup = this.physics.add.group({
    classType: AmmoBox,
    maxSize: 1,
    runChildUpdate: true
  })

  const ammoTimer = this.time.addEvent({ delay: 8000, callback: createAmmoBox, callbackScope: this, loop: true })

  function ammoCheckCollider (player, ammo) {
    if(player.active === true && ammo.active === true) {
      ammunitionCount += 25
      ammunitionText.setText(`${ammunitionCount}`)
      ammo.setActive(false).setVisible(false)
    }
  }
  
  function createAmmoBox() {
    let ammunition = ammoBoxGroup.get()
    if (ammunition) {
      ammunition.create()
    }
  }

  // Player sprites and config
  player = this.physics.add.sprite(40, 300, 'player')
  player.setCollideWorldBounds(true).play('fly')

  // Enemys
  enemys = this.physics.add.group({
    classType: Enemy,
    maxSize: 10,
    runChildUpdate: true
  })

  const enemyTimer = this.time.addEvent({ delay: enemyDelay, callback: createEnemy, callbackScope: this, loop: true })

  function createEnemy() {
    let enemy = enemys.get()
    if (enemy) {
      enemy.create()
    }
  }

  // Fire system
  shoots = this.physics.add.group({
    classType: Shoot,
    runChildUpdate: true
  })
  
  const shootCollider = (shoot, object) => {
    let x = object.x
    let y = object.y
    if(shoot.active === true && object.active === true){
      this.add.sprite(x, y).play('explosion')
      object.setActive(false).setVisible(false)
      shoot.setActive(false).setVisible(false)
    }}
  
  const enemyHit = (shoot, enemy) => {
    let x = enemy.x
    let y = enemy.y
    if (shoot.active === true && enemy.active === true){
      if (score === undefined) {
        score = 100
      }else {
        score += 100
      }
      if (score < 1000) {
        scoreText.setText(`0000${score}`)
      } else if (score >= 1000) {
        scoreText.setText(`000${score}`)
      } else if (score >= 10000) {
        scoreText.setText(`00${score}`)
      } else {
        scoreText.setText(`0${score}`)
      }
      this.add.sprite(x,y).play('explosion')
      shoot.setActive(false).setVisible(false)
      enemy.setActive(false).setVisible(false)
    }
  }

  // Physics player, shoot, ammobox, fuelgallon and enemy
  this.physics.add.collider(shoots, ammoBoxGroup, shootCollider)
  this.physics.add.collider(shoots, fuelGallon, shootCollider)
  this.physics.add.collider(shoots, enemys, enemyHit)
  this.physics.add.overlap(player, fuelGallon, fuelCheckCollider, null, this)
  this.physics.add.overlap(player, ammoBoxGroup, ammoCheckCollider, null, this)
  this.physics.add.overlap(player, enemys, gameover, null, this)
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
  if(keyboard.keyEsc.isDown){
    this.input.stopPropagation()
    this.scene.pause('Amazon')
    this.scene.launch('menu')
  }
  // Check ammo count
  if (ammunitionCount < 15) {
    ammunitionText.setFill('red')
  } else {
    ammunitionText.setFill('#000')
  }
  // Check fuel level
  if (fuelConsu >= 0) {
    fuelBar.setDisplaySize(fuelConsu, 5)
    if (fuelConsu == 0) {
      gameover()
    } 
  }
  if (fuelConsu == 25) {
    warningAudio.play({ volume: 0.5 })
  }
  if (fuelConsu > 25) {
    warningAudio.stop()
  }
  
}

export let Amazon = {
  key: 'Amazon',
  preload: preload,
  create: create,
  update: update
}