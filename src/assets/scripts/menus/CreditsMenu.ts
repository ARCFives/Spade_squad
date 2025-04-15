import { controlsText } from 'assets/utils/textsConfig';
import { BaseMenu } from './base/Base_Menu';

export class CreditsMenu extends BaseMenu {
  constructor() {
    super('credits');
  }

  protected addButtons() {
      this.backButtonMainMenu();
      this.credit(180, 'A29 and KC390: pjackaugusto');
      this.credit(210, 'Speaker and Exit icons: Crusenho');
      this.credit(240, 'Font Nasalization: Typodermic Fonts');
      this.credit(270, 'Coin SFX: Casper Gaming');
  }

  private credit(y: number, author_credit: string) {
    this.add.text(250, y, `${author_credit}`, controlsText);
  }

  create() {
    this.addButtons();
  }
}
