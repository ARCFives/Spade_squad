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

    this.load.spritesheet('player', './src/images/sprites/a29.png', {
        frameWidth: 74,
        frameHeight: 20
      });

    this.load.image('shoot', './src/images/sprites/shoot.png');
    this.load.audio('shootAudio', './src/audio/shoot.WAV');
    }

    create() {
      this.scene.stop('preload');
      this.scene.start('amazon');
    }
}