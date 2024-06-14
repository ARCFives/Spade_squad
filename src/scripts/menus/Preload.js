import Phaser from 'phaser';

export class Preload extends Phaser.Scene {

    constructor() {
        super({key: 'preload'});
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
        fill: '#ffffff'
      }
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
      this.load.spritesheet('player', './src/images/sprites/a29.png', {
        frameWidth: 74,
        frameHeight: 20
      });

      this.load.spritesheet('enemy', './src/images/sprites/cessna.png', {
        frameWidth: 80,
        frameHeight: 28
      });
      this.load.spritesheet('explosion', './src/images/sprites/explosion.png', {
        frameWidth: 100,
        frameHeight: 100
      });
    }

    loadingAudios() {
      this.load.audio('shootAudio', './src/audio/shoot.WAV');
      this.load.audio('explosionAudio', './src/audio/explosion.wav');
    }

    loadingImages() {
      this.load.image('shoot', './src/images/sprites/shoot.png');
    }


    enemyAnimation() {
      this.anims.create({
          key: 'enemyFly',
          frames: this.anims.generateFrameNumbers('enemy', {frames: [0, 1, 2, 3]}),
          frameRate: 10,
          repeat: -1
        });
    }

    explosionAnimation() {
      this.anims.create({
        key: 'explosion',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 19}),
        frameRate: 30,
        hideOnComplete: true
      });
    }

    create() {
      this.enemyAnimation();
      this.explosionAnimation();
      this.scene.stop('preload');
      this.scene.start('amazon');
    }
}