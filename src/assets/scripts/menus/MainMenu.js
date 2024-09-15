import Phaser from 'phaser';
import {
  highscoreText,
  menuInterativeText,
  menuPatternText,
  scoreTextMenu,
} from '../utils/fontPattern';
import { gameConfig } from '../config/gameConfig';

export class MainMenu extends Phaser.Scene {
  constructor() {
    super('mainmenu');
  }

  addStartButton() {
    this.buttonMenu('start', 320, 260, 'Iniciar', () =>
      this.time.delayedCall(500, this.startGame, null, this)
    );
  }

  addHighscore() {
    this.add.text(650, 260, 'Highscore', highscoreText);
    this.add.text(
      670,
      290,
      `${
        localStorage.spadeScore ? localStorage.getItem('spadeScore') : '0000000'
      }`,
      scoreTextMenu
    );
  }

  addControlsButton() {
    this.buttonMenu('controls', 290, 380, 'Controles', () => {
      this.input.stopPropagation();
      this.music.stop();
      this.scene.stop();
      this.scene.start('controls');
    });
  }

  addStoreButton() {
    this.buttonMenu('store', 340, 320, 'Loja', () => console.log('loja'));
  }

  buttonMenu(buttonName, x, y, text, event) {
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

  addCreditsButton() {
    this.buttonMenu('credits', 300, 440, 'Créditos', () => {
      this.input.stopPropagation();
      this.music.stop();
      this.scene.stop();
      this.scene.start('credits');
    });
  }

  startGame() {
    this.input.stopPropagation();
    this.music.stop();
    this.scene.start('amazon');
    this.scene.stop('mainmenu');
  }

  playButtonClick() {
    this.sound.play('menuAudio');
  }

  addMusic() {
    this.music = this.sound.add('mainMenuMusic', { loop: true, volume: 0.4 });
    this.music.play();
  }

  soundToggleButton() {
    this.musicFlag = true;
    this.soundToggle = this.add
      .image(700, 180, 'soundStop')
      .setInteractive()
      .setScale(2);
    this.soundToggle.on('pointerup', () => {
      if (this.musicFlag) {
        this.soundToggle.setTexture('soundPlay');
        this.music.stop();
      } else {
        this.soundToggle.setTexture('soundStop');
        this.music.play();
      }
      this.musicFlag = !this.musicFlag;
    });
  }

  addFonts() {
    this.font = new FontFace(
      'fontStandard',
      'url(./assets/fonts/nasalization-rg.otf)'
    );
    this.spadeFont = new FontFace(
      'fontSpade',
      'url(./assets/fonts/TarrgetAcademyRegular.otf)'
    );
  }

  loadFontsMenuOptions() {
    this.spadeFont.load().then(
      function (loadFont) {
        document.fonts.add(loadFont);
        this.add.text(20, 80, 'Spade Squad', {
          fontFamily: 'fontSpade',
          fontSize: 84,
          color: '#eeeeee',
        });
        this.soundToggleButton();
        this.font.load().then(
          function (loadedFont) {
            document.fonts.add(loadedFont);
            this.addStartButton();
            this.addStoreButton();
            this.addControlsButton();
            this.addCreditsButton();
            this.addHighscore();
            this.add.text(20, 580, `V ${gameConfig.version}`, {
              fontFamily: 'fontStandard',
              fontSize: 14,
              color: '#ddd',
            });
          }.bind(this)
        );
      }.bind(this)
    );
  }

  create() {
    this.addMusic();
    this.addFonts();
    this.loadFontsMenuOptions();
  }
}
