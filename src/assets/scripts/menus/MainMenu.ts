import { GameObjects, Sound } from 'phaser';
import { BaseMenu } from './base/Base_Menu';
import { highScoreTextMenu, scoreTextMenu } from 'assets/utils/textsConfig';
import { gameConfig } from '../config/gameConfig';
import { IMainmenuText } from 'assets/interfaces/texts/IMainmenuText';
export class MainMenu extends BaseMenu {
  private start!: GameObjects.Text;
  private controls!: GameObjects.Text;
  private store!: GameObjects.Text;
  private credits!: GameObjects.Text;
  private music!: Sound.BaseSound;
  private soundToggle!: GameObjects.Image;
  private changeLanguage!: GameObjects.Sprite;

  constructor() {
    super('mainmenu');
  }

  protected addButtons() {
    const whatLanguage: string = localStorage.getItem(
      'spade-language'
    ) as string;
    const getLanguage: IMainmenuText = this.checkLanguage(
      'mainmenu'
    ) as IMainmenuText;

    this.addButtonMenu(
      this.start,
      getLanguage.iniciar.x,
      getLanguage.iniciar.y,
      `${getLanguage.iniciar.text}`,
      this.startGame.bind(this)
    );
    this.addButtonMenu(
      this.store,
      getLanguage.loja.x,
      getLanguage.loja.y,
      `${getLanguage.loja.text}`,
      this.openStore.bind(this)
    );
    this.addButtonMenu(
      this.controls,
      getLanguage.controles.x,
      getLanguage.controles.y,
      `${getLanguage.controles.text}`,
      this.openControls.bind(this)
    );
    this.addButtonMenu(
      this.credits,
      getLanguage.creditos.x,
      getLanguage.creditos.y,
      `${getLanguage.creditos.text}`,
      this.openCredits.bind(this)
    );
    this.changeLanguage = this.add
      .sprite(50, 580, 'languages', this.getFlagLanguage(whatLanguage))
      .setScale(1.3)
      .setInteractive();
    this.changeLanguage.on('pointerup', () => this.onChangeLanguage());
  }

  private onChangeLanguage() {
    const actualLanguage: string = localStorage.getItem(
      'spade-language'
    ) as string;
    if (actualLanguage === 'portugues') {
      localStorage.setItem('spade-language', 'english');
    } else if (actualLanguage === 'english') {
      localStorage.setItem('spade-language', 'spanish');
    } else {
      localStorage.setItem('spade-language', 'portugues');
    }
    this.scene.restart(this);
  }

  private getFlagLanguage(language: string): number {
    if (language === 'portugues') return 0;
    else if (language === 'english') return 1;
    else return 2;
  }

  private addHighscore() {
    this.add.text(650, 260, 'Highscore', highScoreTextMenu);
    this.add.text(
      670,
      290,
      `${
        localStorage.spadeScore ? localStorage.getItem('spadeScore') : '0000000'
      }`,
      scoreTextMenu
    );
  }

  private startGame() {
    this.time.delayedCall(
      300,
      () => {
        this.input.stopPropagation();
        this.scene.start('plane_selection');
        this.scene.stop('mainmenu');
      },
      undefined,
      this
    );
    this.registry.set('musicPlay', false);
    this.registry.set('musicPlayFlag', false);
    this.music.stop();
  }

  private openStore() {
    this.input.stopPropagation();
    this.scene.stop(this);
    this.scene.start('store');
  }

  private openControls() {
    this.input.stopPropagation();
    this.scene.stop(this);
    this.scene.start('controls');
  }

  private openCredits() {
    this.input.stopPropagation();
    this.scene.stop();
    this.scene.start('credits');
  }

  private addMusic() {
    this.music = this.sound.add('mainMenuMusic', { loop: true, volume: 0.2 });
    this.music.play();
  }

  private addSoundToggleButton() {
    const musicPlayFlag = this.registry.get('musicPlayFlag');
    if (musicPlayFlag === false) {
      this.soundToggle = this.add
        .image(100, 180, 'soundStop')
        .setInteractive()
        .setScale(2);
    } else {
      this.soundToggle = this.add
        .image(100, 180, 'soundPlay')
        .setInteractive()
        .setScale(2);
    }
    this.soundToggle.on('pointerup', () => {
      const flag = this.registry.get('musicPlayFlag');
      if (!flag) {
        this.soundToggle.setTexture('soundPlay');
        this.music.stop();
      } else {
        this.soundToggle.setTexture('soundStop');
        this.music.play();
      }
      this.registry.set('musicPlayFlag', !flag);
    });
  }

  private verifyMusicPlay() {
    const musicPlay = this.registry.get('musicPlay');
    const musicPlayFlag = this.registry.get('musicPlayFlag');
    if (musicPlay === undefined && musicPlayFlag === undefined) {
      this.registry.set('musicPlay', true);
      this.registry.set('musicPlayFlag', false);
      this.addMusic();
    }
    if (musicPlay === false) {
      this.addMusic();
      this.registry.set('musicPlay', true);
    }
  }

  create() {
    document.fonts.load('18px fontStandard').then(() => {
      this.add.text(745, 580, `V ${gameConfig.version}`, {
        fontFamily: 'fontStandard',
        fontSize: 14,
        color: '#ddd',
      });
    });
    document.fonts.load('18px fontSpade').then(() => {
      this.add.text(20, 80, 'Spade Squad', {
        fontFamily: 'fontSpade',
        fontSize: 84,
        color: '#eeeeee',
      });
    });
    this.addButtons();
    this.addHighscore();
    this.verifyMusicPlay();
    this.addSoundToggleButton();
  }
}
