import Phaser from 'phaser';

export class DevScreen extends Phaser.Scene {
  constructor() {
    super('devscreen');
  }

  create() {
    this.font = new FontFace(
      'fontStandard',
      'url(./assets/fonts/nasalization-rg.otf)'
    );
    this.font.load().then(
      function (loadedFont) {
        document.fonts.add(loadedFont);
        this.add.text(300, 350, 'github/ARCFives', {
          fontSize: 22,
          fontFamily: 'fontStandard',
          color: '#fff',
        });
        this.add.image(400, 200, 'profile').setDisplaySize(256, 256);
      }.bind(this)
    );
    this.time.delayedCall(2000, this.callMainMenu, null, this);
  }

  callMainMenu() {
    this.scene.stop('devscreen');
    this.scene.start('mainmenu');
  }
}
