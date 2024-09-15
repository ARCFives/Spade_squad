import Phaser from 'phaser';
import {
  gameoverText,
  menuInterativeText,
  menuPatternText,
} from '../utils/fontPattern';

export class Gameover extends Phaser.Scene {
  constructor() {
    super('gameover');
  }

  create() {
    this.font = new FontFace(
      'fontStandard',
      'url(./assets/fonts/nasalization-rg.otf)'
    );
    this.font.load().then(
      function (loadedFont) {
        document.fonts.add(loadedFont);
        this.add.text(300, 120, 'Game Over', gameoverText);
        this.add.text(240, 200, 'Tecle R para reset', gameoverText);
        this.mainButton = this.add
          .text(250, 400, `Menu Principal`, menuPatternText)
          .setInteractive();
        this.mainButton.on('pointerover', () =>
          this.mainButton.setStyle(menuInterativeText)
        );
        this.mainButton.on('pointerout', () =>
          this.mainButton.setColor('#008800')
        );
        this.mainButton.on('pointerup', () => {
          this.input.stopPropagation();
          this.scene.stop(this);
          this.scene.start('mainmenu');
        });
      }.bind(this)
    );

    this.input.keyboard.on('keydown-R', () => {
      this.input.stopPropagation();
      this.scene.stop(this);
      this.scene.start('amazon');
    });
  }
}
