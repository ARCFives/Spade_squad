import { IGameoverText } from 'assets/interfaces/texts/IGameoverText';
import { language } from 'assets/utils/languages';
import {
  gameoverText,
  menuInterativeText,
  menuPatternText,
} from 'assets/utils/textsConfig';
import { GameObjects, Scene } from 'phaser';

export class Gameover extends Scene {
  private mainMenuButton!: GameObjects.Text;

  constructor() {
    super('gameover');
  }

  protected checkLanguage() {
    const getLanguage = localStorage.getItem('spade-language') as string;
    if (getLanguage === 'portugues') return language.portugues.gameover;
    if (getLanguage === 'english') return language.english.gameover;
    if (getLanguage === 'spanish') return language.spanish.gameover;
  }

  create() {
    const getLanguage: IGameoverText = this.checkLanguage() as IGameoverText;

    document.fonts.load('18px fontStandard').then(() => {
      this.add.text(300, 120, 'Game Over', gameoverText);
      this.add.text(240, 200, `${getLanguage.reset}`, gameoverText);
      this.mainMenuButton = this.add
        .text(250, 400, `${getLanguage.mainmenu}`, menuPatternText)
        .setInteractive();
      this.mainMenuButton.on('pointerover', () =>
        this.mainMenuButton.setStyle(menuInterativeText)
      );
      this.mainMenuButton.on('pointerout', () =>
        this.mainMenuButton.setColor('#008800')
      );
      this.mainMenuButton.on('pointerup', () => {
        this.input.stopPropagation();
        this.scene.stop(this);
        this.scene.start('mainmenu');
      });
    });

    this.input.keyboard!.on('keydown-R', () => {
      this.input.stopPropagation();
      this.scene.stop(this);
      this.scene.start('amazon');
    });
  }
}
