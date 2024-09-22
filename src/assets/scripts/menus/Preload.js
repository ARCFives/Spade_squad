import Phaser from 'phaser';

export class Preload extends Phaser.Scene {
  constructor() {
    super({ key: 'preload' });
  }

  preload() {
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    let loadingText = this.make.text({
      x: 315,
      y: 450,
      text: 'Carrengando...',
      style: {
        font: '20px arial',
        fill: '#ffffff',
      },
    });

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 480, 320, 12);

    this.load.on('progress', function (value) {
      progressBar.clear();
      progressBar.fillStyle(0x880000, 1);
      progressBar.fillRect(240, 480, 300 * value, 12);
    });
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });

    this.loadingSprites();
    this.loadingImages();
    this.loadingAudios();
  }

  loadingSprites() {
    this.load.spritesheet('player', './assets/images/sprites/a29.png', {
      frameWidth: 74,
      frameHeight: 20,
    });

    this.load.spritesheet('enemy', './assets/images/sprites/cessna.png', {
      frameWidth: 80,
      frameHeight: 28,
    });
    this.load.spritesheet(
      'explosion',
      './assets/images/sprites/explosion.png',
      {
        frameWidth: 100,
        frameHeight: 100,
      }
    );
    this.load.spritesheet('missile', './assets/images/sprites/missile.png', {
      frameWidth: 35,
      frameHeight: 7,
    });
    this.load.spritesheet('controls', './assets/images/sprites/controls.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('space', './assets/images/sprites/space.png', {
      frameWidth: 64,
      frameHeight: 32,
    });
    this.load.spritesheet('cards', './assets/images/cards/cards.png', {
      frameWidth: 64,
      frameHeight: 96,
    });
  }

  loadingAudios() {
    this.load.audio('shootAudio', './assets/audio/shoot.WAV');
    this.load.audio('explosionAudio', './assets/audio/explosion.wav');
    this.load.audio('warningAudio', './assets/audio/warning.wav');
    this.load.audio('engineAudio', './assets/audio/engine.wav');
    this.load.audio('menuAudio', './assets/audio/menu.wav');
    this.load.audio('airplaneAudio', './assets/audio/airplanePass.wav');
    this.load.audio('pickupAudio', './assets/audio/pickup.wav');
    this.load.audio('missileAudio', './assets/audio/missile.wav');
    this.load.audio('emptyAudio', './assets/audio/tick.wav');
    this.load.audio('mainMenuMusic', './assets/audio/mainmenu.ogg');
    this.load.audio('coinSound', './assets/audio/coin.ogg');
  }

  loadingImages() {
    this.load.image('shoot', './assets/images/sprites/shoot.png');
    this.load.image('sky', './assets/images/background/map.png');
    this.load.image(
      'storeBackground',
      './assets/images/background/store_background.png'
    );
    this.load.image(
      'forest_front',
      './assets/images/background/forest_front.png'
    );
    this.load.image(
      'forest_back',
      './assets/images/background/forest_back.png'
    );
    this.load.image('mountains', './assets/images/background/mountains.png');
    this.load.image('ammoIcon', './assets/images/hud/ammoIcon.png');
    this.load.image('fuelIcon', './assets/images/hud/fuelIcon.png');
    this.load.image('fuelBar', './assets/images/hud/fuelBar.png');
    this.load.image('profile', './assets/images/hud/profile.png');
    this.load.image('soundStop', './assets/images/hud/speakerMute.png');
    this.load.image('soundPlay', './assets/images/hud/speakerOn.png');
    this.load.image('exitIcon', './assets/images/hud/exit.png');
    this.load.image('fullIcon', './assets/images/hud/fullButton.png');
    this.load.image('missileIcon', './assets/images/hud/missile_icon.png');
    this.load.image('kc', './assets/images/sprites/kc.png');
    this.load.image('gallon', './assets/images/sprites/gallon.png');
    this.load.image('ammoBox', './assets/images/sprites/ammoBox.png');
    this.load.image('missileBox', './assets/images/sprites/missileBox.png');
  }

  enemyAnimation() {
    this.anims.create({
      key: 'enemyFly',
      frames: this.anims.generateFrameNumbers('enemy', {
        frames: [0, 1, 2, 3],
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  explosionAnimation() {
    this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNumbers('explosion', {
        start: 0,
        end: 19,
      }),
      frameRate: 30,
      hideOnComplete: true,
    });
  }

  playerAnimations() {
    this.anims.create({
      key: 'playerFly',
      frames: this.anims.generateFrameNumbers('player', { frames: [0, 1] }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'playerShoot',
      frames: this.anims.generateFrameNumbers('player', { frames: [2, 3, 4] }),
      frameRate: 60,
    });
  }

  missileAnimations() {
    this.anims.create({
      key: 'missileFire',
      frames: this.anims.generateFrameNames('missile', { frames: [0, 1] }),
      frameRate: 10,
      repeat: -1,
    });
  }

  controlsAnimations() {
    this.anims.create({
      key: 'control_W',
      frames: this.anims.generateFrameNames('controls', { frames: [0, 1] }),
      frameRate: 3,
      repeat: -1,
    });
    this.anims.create({
      key: 'control_UP',
      frames: this.anims.generateFrameNames('controls', { frames: [10, 11] }),
      frameRate: 3,
      repeat: -1,
    });
    this.anims.create({
      key: 'control_S',
      frames: this.anims.generateFrameNames('controls', { frames: [2, 3] }),
      frameRate: 3,
      repeat: -1,
    });
    this.anims.create({
      key: 'control_DOWN',
      frames: this.anims.generateFrameNames('controls', { frames: [12, 13] }),
      frameRate: 3,
      repeat: -1,
    });
    this.anims.create({
      key: 'control_A',
      frames: this.anims.generateFrameNames('controls', { frames: [4, 5] }),
      frameRate: 3,
      repeat: -1,
    });
    this.anims.create({
      key: 'control_LEFT',
      frames: this.anims.generateFrameNames('controls', { frames: [14, 15] }),
      frameRate: 3,
      repeat: -1,
    });
    this.anims.create({
      key: 'control_D',
      frames: this.anims.generateFrameNames('controls', { frames: [6, 7] }),
      frameRate: 3,
      repeat: -1,
    });
    this.anims.create({
      key: 'control_RIGHT',
      frames: this.anims.generateFrameNames('controls', { frames: [16, 17] }),
      frameRate: 3,
      repeat: -1,
    });
    this.anims.create({
      key: 'control_PAUSE',
      frames: this.anims.generateFrameNames('controls', { frames: [8, 9] }),
      frameRate: 3,
      repeat: -1,
    });
    this.anims.create({
      key: 'control_MISSILE',
      frames: this.anims.generateFrameNames('controls', { frames: [18, 19] }),
      frameRate: 3,
      repeat: -1,
    });
    this.anims.create({
      key: 'control_FIRE',
      frames: this.anims.generateFrameNames('space', { frames: [0, 1] }),
      frameRate: 3,
      repeat: -1,
    });
  }

  create() {
    this.enemyAnimation();
    this.explosionAnimation();
    this.missileAnimations();
    this.playerAnimations();
    this.controlsAnimations();
    this.scene.stop('preload');
    this.scene.start('devscreen');
  }
}
