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
        color: '#ffffff',
      },
    });

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 480, 320, 12);

    this.load.on('progress', function (value: number) {
      progressBar.clear();
      progressBar.fillStyle(0x880000, 1);
      progressBar.fillRect(240, 480, 300 * value, 12);
    });
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });

    this.loadingImages();
    this.loadingSprites();
    this.loadingAudios();
  }

  loadingSprites() {
    this.load.setPath('./assets/images/sprites/'); 
    this.load.spritesheet('player', 'a29.png', {
      frameWidth: 74,
      frameHeight: 20,
    });

    this.load.spritesheet('enemy', 'cessna.png', {
      frameWidth: 80,
      frameHeight: 28,
    });
    this.load.spritesheet(
      'explosion',
      'explosion.png',
      {
        frameWidth: 100,
        frameHeight: 100,
      }
    );
    this.load.spritesheet('missile', 'missile.png', {
      frameWidth: 35,
      frameHeight: 7,
    });
    this.load.spritesheet('controls', 'controls.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('space', 'space.png', {
      frameWidth: 64,
      frameHeight: 32,
    });
    this.load.spritesheet('cards', 'cards.png', {
      frameWidth: 64,
      frameHeight: 96,
    });
    this.load.image('shoot', 'shoot.png');
    this.load.image('kc390', 'kc.png');
    this.load.image('gallon', 'gallon.png');
    this.load.image('ammoBox', 'ammoBox.png');
    this.load.image('missileBox', 'missileBox.png');
  }

  loadingAudios() {
    this.load.setPath('./assets/audio/');
    this.load.audio('shootAudio', 'shoot.WAV');
    this.load.audio('explosionAudio', 'explosion.wav');
    this.load.audio('warningAudio', 'warning.wav');
    this.load.audio('engineAudio', 'engine.wav');
    this.load.audio('menuAudio', 'menu.wav');
    this.load.audio('airplaneAudio', 'airplanePass.wav');
    this.load.audio('pickupAudio', 'pickup.wav');
    this.load.audio('missileAudio', 'missile.wav');
    this.load.audio('emptyAudio', 'tick.wav');
    this.load.audio('mainMenuMusic', 'mainmenu.ogg');
    this.load.audio('levelAmazonMusic', 'amazonLevel.ogg');
    this.load.audio('coinSound', 'coin.ogg');
  }

  loadingImages() {
    this.load.setPath('./assets/images/background/');
    this.load.image('sky', 'map.png');
    this.load.image('storeBackground','store_background.png');
    this.load.image('forest_front','forest_front.png');
    this.load.image('forest_back','forest_back.png');
    this.load.image('mountains', 'mountains.png');
    this.load.setPath('./assets/images/hud/');
    this.load.image('ammoIcon', 'ammoIcon.png');
    this.load.image('fuelIcon', 'fuelIcon.png');
    this.load.image('fuelBar', 'fuelBar.png');
    this.load.image('profile', 'profile.png');
    this.load.image('soundStop', 'speakerMute.png');
    this.load.image('soundPlay', 'speakerOn.png');
    this.load.image('exitIcon', 'exit.png');
    this.load.image('fullIcon', 'fullButton.png');
    this.load.image('missileIcon', 'missile_icon.png'); 
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
      key: 'control_REFUEL',
      frames: this.anims.generateFrameNames('controls', { frames: [20, 21] }),
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
