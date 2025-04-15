import { menuInterativeText, menuPatternText } from 'assets/utils/textsConfig';
import { GameObjects, Scene } from 'phaser';

export abstract class BaseMenu extends Scene{
    protected backMenu!: GameObjects.Image;

    constructor(key: string) {
        super(key);
    }

    protected addButtonMenu(buttonName: GameObjects.Text, x: number, y: number, text: string, event: (param?: string) => void): void {
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
          this.sound.play('menuAudio');
          this.scene.start('mainmenu');
          this.scene.stop(this);
        });
    }

    private playButtonClick(): void {
        this.sound.play('menuAudio');
    }

    public abstract create(): void;

    protected abstract addButtons(): void;
}