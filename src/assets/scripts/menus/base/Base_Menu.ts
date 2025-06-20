import { language } from 'assets/utils/languages';
import { menuInterativeText, menuPatternText } from 'assets/utils/textsConfig';
import { GameObjects, Scene } from 'phaser';

export abstract class BaseMenu extends Scene {
  protected backMenu!: GameObjects.Image;

  constructor(key: string) {
    super(key);
  }

  protected addButtonMenu(
    buttonName: GameObjects.Text,
    x: number,
    y: number,
    text: string,
    event: (param?: string) => void
  ): void {
    buttonName = this.add
      .text(x, y, `${text}`, menuPatternText)
      .setInteractive();
    buttonName.on('pointerover', () => buttonName.setStyle(menuInterativeText));
    buttonName.on('pointerout', () => buttonName.setColor('#008800'));
    buttonName.on('pointerup', () => {
      this.playButtonClick();
      event();
    });
  }

  protected backButtonMainMenu(): void {
    this.backMenu = this.add
      .image(100, 100, 'exitIcon')
      .setInteractive()
      .setScale(2);
    this.backMenu.on('pointerup', () => {
      this.input.stopPropagation();
      this.sound.play('menuAudio');
      this.scene.stop(this);
      this.scene.start('mainmenu');
    });
  }

  private playButtonClick(): void {
    this.sound.play('menuAudio');
  }

  protected checkLanguage(type: string) {
    const getLanguage = localStorage.getItem('spade-language') as string;
    if (type === 'controls') {
      if (getLanguage === 'portugues') return language.portugues.controls;
      if (getLanguage === 'english') return language.english.controls;
    } else if (type === 'mainmenu') {
      if (getLanguage === 'portugues') return language.portugues.mainmenu;
      if (getLanguage === 'english') return language.english.mainmenu;
    } else if (type === 'pausemenu') {
      if (getLanguage === 'portugues') return language.portugues.pauseGame;
      if (getLanguage === 'english') return language.english.pauseGame;
    } else if (type === 'storemenu') {
      if (getLanguage === 'portugues') return language.portugues.store;
      if (getLanguage === 'english') return language.english.store;
    } else if (type === 'selectionmenu') {
      if (getLanguage === 'portugues') return language.portugues.selection_menu;
      if (getLanguage === 'english') return language.english.selection_menu;
    }
  }

  public abstract create(): void;

  protected abstract addButtons(): void;
}
