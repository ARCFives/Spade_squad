import { Scene } from 'phaser';

export class CreditsMenu extends Scene {
  constructor() {
    super('credits');
  }

  addFont() {
    this.font = new FontFace(
      'fontStandard',
      'url(./assets/fonts/nasalization-rg.otf)'
    );
  }

  backButtonMainMenu() {
    this.backMenu = this.add
      .image(100, 100, 'exitIcon')
      .setInteractive()
      .setScale(2);
    this.backMenu.on('pointerup', () => {
      this.sound.play('menuAudio');
      this.scene.start('mainmenu');
      this.scene.stop(this);
    });
  }

  credit(y, text) {
    this.add.text(250, y, `${text}`, {
      fontFamily: 'fontStandard',
      fontSize: 18,
      color: '#ddd',
    });
  }

  addCredits() {
    this.font.load().then(
      function (loadedFont) {
        document.fonts.add(loadedFont);
        this.backButtonMainMenu();
        this.credit(180, 'A29 and KC390: pjackaugusto');
        this.credit(210, 'Main menu music: Abstraction');
        this.credit(240, 'Speaker and Exit icons: Crusenho');
        this.credit(270, 'Font Nasalization: Typodermic Fonts');
      }.bind(this)
    );
  }

  create() {
    this.addFont();
    this.addCredits();
  }
}
