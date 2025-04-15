import { Scene } from 'phaser';

export class DevScreen extends Scene {
  constructor() {
    super('devscreen');
  }

  private verifiedPlayerCash() {
    const playerCash = localStorage.getItem('spadeCash');
    if (playerCash === null || undefined) {
      localStorage.setItem('spadeCash', '1000');
    }
  }

  private verifiedPlayerUpgrades() {
    const playerUpgrades = localStorage.getItem('spadeUpgrades');
    if (playerUpgrades === null || undefined) {
      localStorage.setItem(
        'spadeUpgrades',
        JSON.stringify({
          engineLvI: false,
          engineLvII: false,
          missileI: false,
          missileII: false,
          mainGunI: false,
          airfuelling: false,
        })
      );
    }
  }

  create() {
    document.fonts.load('18px fontStandard').then(() => {
        this.add.text(300, 350, 'github/ARCFives', {
            fontSize: 22,
            fontFamily: 'fontStandard',
            color: '#fff',
          });
        this.add.image(400, 200, 'profile').setDisplaySize(256, 256);
    });
    this.verifiedPlayerCash();
    this.verifiedPlayerUpgrades();
    this.time.delayedCall(2000, this.callMainMenu, undefined, this);
  }

  callMainMenu() {
    const hasSetLanguage = localStorage.getItem('spade-language');
    if(hasSetLanguage) {
      this.scene.stop(this);
      this.scene.start('mainmenu');
    }else {
      this.scene.stop(this);
      this.scene.start('language');  
    }
  }
}