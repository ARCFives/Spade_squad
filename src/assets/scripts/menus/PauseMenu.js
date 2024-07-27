import Phaser from 'phaser';
import { menuInterativeText, menuPatternText } from '../utils/fontPattern';
// import { Amazon } from '../maps/Amazon';

export class PauseMenu extends Phaser.Scene {
  constructor() {
    super('pausemenu');
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

  playButtonClick() {
    this.sound.play('menuAudio');
  }

  addButtons() {
    this.buttonMenu(
      'resume',
      300,
      230,
      'CONTINUAR',
      this.callResumeScene.bind(this)
    );
    this.buttonMenu(
      'mainmenu',
      250,
      290,
      'MENU PRINCIPAL',
      this.callMainMenu.bind(this)
    );
  }

  callResumeScene() {
    this.scene.resume('amazon');
    this.scene.stop('pausemenu');
  }

  callMainMenu() {
    this.input.stopPropagation();
    this.scene.stop('amazon');
    this.scene.stop();
    this.scene.get('amazon').engineSound.stop();
    this.scene.get('amazon').warningSound.stop();
    this.scene.start('mainmenu');
  }

  create() {
    this.addButtons();
  }
}
