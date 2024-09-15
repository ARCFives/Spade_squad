import Phaser from 'phaser';

export class ControlsMenu extends Phaser.Scene {
  constructor() {
    super('controls');
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

  controlInfo(control_1, control_2, text, y) {
    this.add.sprite(300, y, '').play(`${control_1}`);
    this.add.sprite(340, y, '').play(`${control_2}`);
    this.add.text(360, y - 10, `${text}`, {
      fontFamily: 'fontStandard',
      fontSize: 18,
      color: '#ddd',
    });
  }

  controlInfoI(control_1, text, y) {
    this.add.sprite(300, y, '').play(`${control_1}`);
    this.add.text(320, y - 10, `${text}`, {
      fontFamily: 'fontStandard',
      fontSize: 18,
      color: '#ddd',
    });
  }

  controlInfoII(control_1, text, y) {
    this.add.sprite(315, y, '').play(`${control_1}`);
    this.add.text(350, y - 10, `${text}`, {
      fontFamily: 'fontStandard',
      fontSize: 18,
      color: '#ddd',
    });
  }

  controlsList() {
    this.backButtonMainMenu();
    this.add.text(320, 80, 'Controles', {
      fontFamily: 'fontStandard',
      fontSize: 36,
      color: '#fff',
    });
    this.controlInfo('control_W', 'control_UP', 'Mover para cima', 150);
    this.controlInfo('control_S', 'control_DOWN', 'Mover para baixo', 200);
    this.controlInfo('control_A', 'control_LEFT', 'Mover para esquerda', 250);
    this.controlInfo('control_D', 'control_RIGHT', 'Mover para direita', 300);
    this.controlInfoI('control_PAUSE', 'Pause', 350);
    this.controlInfoII('control_FIRE', 'Disparar arma', 400);
    this.controlInfoI('control_MISSILE', 'Disparar míssil', 450);
  }

  create() {
    this.controlsList();
  }
}
