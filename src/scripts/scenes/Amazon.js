import { initialState } from "../base/gameConfig.js"
import { AmmoBox } from "../gameObjects/ammoSystem/AmmoClass.js"
import { Enemy } from "../gameObjects/enemySystem/EnemyClass.js"
import { FuelGallon } from "../gameObjects/fuelSystem/FuelClass.js"
import { Shoot } from "../gameObjects/shootSystem/ShootClass.js"
import Phaser from "phaser"

let player, shoots, shootAudio, lastFired, keyboard, ammunitionText, ammunitionCount, ammoBoxGroup, fuelBar, fuelGallon, fuelConsu, enemys, enemyDelay = 2000, scoreText, score

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
}

function create() {
  // Variables atrributes
  ammunitionCount = initialState.ammunitionInitial
  fuelConsu = initialState.fuelInitial
  lastFired = initialState.lastFired
  score = initialState.scoreCount
  gameover = () => {
    if (localStorage.score == null) {
      localStorage.setItem('score', score)
    }else if (parseInt(localStorage.score) < score) {
      localStorage.setItem('score', score)
    }
    
    this.input.stopPropagation()
    this.scene.stop(this)
    this.scene.start('Gameover')
    engineAudio.stop()
    warningAudio.stop()
  }
  // Background Scene
  this.background = this.add.tileSprite(
    400,
    300,
    800,
    600,
    'sky'
  )

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

  this.time.addEvent({ delay: 5000, callback: consumeFuel, callbackScope: this, loop: true })

  function consumeFuel() {
    fuelConsu -= 5
  }

  fuelGallon = this.physics.add.group({
    classType: FuelGallon,
    maxSize: 1,
    runChildUpdate: true,
  })

  this.time.addEvent({delay:30000, callback: createFuelGallon, callbackScope: this, loop: true})

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

  this.time.addEvent({ delay: 8000, callback: createAmmoBox, callbackScope: this, loop: true })

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

  this.time.addEvent({ delay: enemyDelay, callback: createEnemy, callbackScope: this, loop: true })

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
    this.scene.launch('MenuPause')
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