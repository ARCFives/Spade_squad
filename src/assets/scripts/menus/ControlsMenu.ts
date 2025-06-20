import { controlsText } from 'assets/utils/textsConfig';
import { BaseMenu } from './base/Base_Menu';
import { IControlsText } from 'assets/interfaces/texts/IControlsText';

export class ControlsMenu extends BaseMenu {
  constructor() {
    super('controls');
  }

  protected addButtons() {
    const getLanguage: IControlsText = this.checkLanguage(
      'controls'
    ) as IControlsText;

    this.add.text(320, 80, `${getLanguage.mainText}`, {
      fontFamily: 'fontStandard',
      fontSize: 36,
      color: '#fff',
    });

    this.addControlInfo(
      'control_W',
      'control_UP',
      `${getLanguage.moveUp}`,
      150
    );
    this.addControlInfo(
      'control_S',
      'control_DOWN',
      `${getLanguage.moveDown}`,
      200
    );
    this.addControlInfo(
      'control_A',
      'control_LEFT',
      `${getLanguage.moveLeft}`,
      250
    );
    this.addControlInfo(
      'control_D',
      'control_RIGHT',
      `${getLanguage.moveRight}`,
      300
    );
    this.addControlBigInfo('control_PAUSE', `${getLanguage.pause}`, 350);
    this.addControlInfoII('control_FIRE', `${getLanguage.playerShoot}`, 400);
    this.addControlBigInfo(
      'control_MISSILE',
      `${getLanguage.playerMissile}`,
      450
    );
    this.addControlInfoII(
      'control_REFUEL',
      `${getLanguage.callRefuelling}`,
      500
    );
  }

  private addControlInfo(
    control_1_name_animation: string,
    control_2_name_animation: string,
    control_name: string,
    y: number
  ) {
    this.add.sprite(300, y, '').play(`${control_1_name_animation}`);
    this.add.sprite(340, y, '').play(`${control_2_name_animation}`);
    this.add.text(360, y - 10, `${control_name}`, controlsText);
  }

  private addControlBigInfo(
    control_name_animation: string,
    control_name: string,
    y: number
  ) {
    this.add.sprite(300, y, '').play(`${control_name_animation}`);
    this.add.text(320, y - 10, `${control_name}`, {
      fontFamily: 'fontStandard',
      fontSize: 18,
      color: '#ddd',
    });
  }

  private addControlInfoII(
    control_name_animation: string,
    control_name: string,
    y: number
  ) {
    this.add.sprite(315, y, '').play(`${control_name_animation}`);
    this.add.text(350, y - 10, `${control_name}`, {
      fontFamily: 'fontStandard',
      fontSize: 18,
      color: '#ddd',
    });
  }

  create() {
    this.backButtonMainMenu();
    this.addButtons();
  }
}
