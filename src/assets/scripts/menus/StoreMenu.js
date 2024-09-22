import Phaser from 'phaser';

export class StoreMenu extends Phaser.Scene {
  constructor() {
    super('store');
  }

  addFont() {
    this.font = new FontFace(
      'fontStandard',
      'url(./assets/fonts/nasalization-rg.otf)'
    );
  }

  backButtonMainMenu() {
    this.backMenu = this.add
      .image(750, 550, 'exitIcon')
      .setInteractive()
      .setScale(2);
    this.backMenu.on('pointerup', () => {
      this.sound.play('menuAudio');
      this.scene.start('mainmenu');
      this.scene.stop(this);
    });
  }

  addInfos() {
    this.upgradesPaid = JSON.parse(localStorage.getItem('spadeUpgrades'));
    this.playerCash = localStorage.getItem('spadeCash');
    this.itemDescription = this.add.text(500, 60, '', {
      fontFamily: 'fontStandard',
      fontSize: 16,
      fixedWidth: 140,
      wordWrap: { width: 140 },
    });
    this.playerCashText = this.add.text(30, 340, `$ ${this.playerCash}`, {
      fontFamily: 'fontStandard',
      fontSize: 18,
      color: '#000',
    });
  }

  engineECU() {
    const UPGRADE_VALUE = 4000;
    this.engineLvI = this.add.sprite(200, 420, 'cards', 0).setInteractive();
    this.engineLvIValue = this.add.text(172, 445, `$${UPGRADE_VALUE}`, {
      fontFamily: 'fontStandard',
      fontSize: 16,
    });
    if (this.upgradesPaid.engineLvI) {
      this.engineLvI.setAlpha(0.3);
      this.engineLvIValue.setAlpha(0.3);
    }
    this.engineLvI.on('pointerup', () => {
      if (this.upgradesPaid.engineLvI) return;
      if (parseInt(this.playerCash) >= UPGRADE_VALUE) {
        const playerLowerCash = parseInt(this.playerCash) - UPGRADE_VALUE;
        this.sound.play('coinSound');
        const upgrade = { ...this.upgradesPaid, engineLvI: true };
        this.engineLvI.setAlpha(0.3);
        this.engineLvIValue.setAlpha(0.3);
        localStorage.setItem('spadeUpgrades', JSON.stringify(upgrade));
        localStorage.setItem('spadeCash', playerLowerCash);
        this.playerCash = localStorage.getItem('spadeCash');
        this.playerCashText.setText(`$ ${this.playerCash}`);
      }
    });
    this.engineLvI.on('pointerover', () => {
      this.itemDescription.setText('Economiza 50% de combustível.');
    });
    this.engineLvI.on('pointerout', () => {
      this.itemDescription.setText('');
    });
  }

  engineECUII() {
    const UPGRADE_VALUE = 4800;
    this.engineLvII = this.add.sprite(320, 420, 'cards', 1).setInteractive();
    this.engineLvIIValue = this.add.text(292, 445, `$${UPGRADE_VALUE}`, {
      fontFamily: 'fontStandard',
      fontSize: 16,
    });
    if (this.upgradesPaid.engineLvII) {
      this.engineLvII.setAlpha(0.3);
      this.engineLvIIValue.setAlpha(0.3);
    }
    this.engineLvII.on('pointerup', () => {
      if (this.upgradesPaid.engineLvII) return;
      if (parseInt(this.playerCash) >= UPGRADE_VALUE) {
        const playerLowerCash = parseInt(this.playerCash) - UPGRADE_VALUE;
        this.sound.play('coinSound');
        const upgrade = { ...this.upgradesPaid, engineLvII: true };
        this.engineLvII.setAlpha(0.3);
        this.engineLvIIValue.setAlpha(0.3);
        localStorage.setItem('spadeUpgrades', JSON.stringify(upgrade));
        localStorage.setItem('spadeCash', playerLowerCash);
        this.playerCash = localStorage.getItem('spadeCash');
        this.playerCashText.setText(`$ ${this.playerCash}`);
      }
    });
    this.engineLvII.on('pointerover', () => {
      this.itemDescription.setText('Aumenta a velocidade em 20%.');
    });
    this.engineLvII.on('pointerout', () => {
      this.itemDescription.setText('');
    });
  }

  refuellingUp() {
    const UPGRADE_VALUE = 6000;
    this.airfuelling = this.add.sprite(440, 420, 'cards', 5).setInteractive();
    this.airfuellingValue = this.add.text(412, 445, `$${UPGRADE_VALUE}`, {
      fontFamily: 'fontStandard',
      fontSize: 16,
    });
    if (this.upgradesPaid.airfuelling) {
      this.airfuelling.setAlpha(0.3);
      this.airfuellingValue.setAlpha(0.3);
    }
    this.airfuelling.on('pointerup', () => {
      if (this.upgradesPaid.airfuelling) return;
      if (parseInt(this.playerCash) >= UPGRADE_VALUE) {
        const playerLowerCash = parseInt(this.playerCash) - UPGRADE_VALUE;
        this.sound.play('coinSound');
        const upgrade = { ...this.upgradesPaid, airfuelling: true };
        this.airfuelling.setAlpha(0.3);
        this.airfuellingValue.setAlpha(0.3);
        localStorage.setItem('spadeUpgrades', JSON.stringify(upgrade));
        localStorage.setItem('spadeCash', playerLowerCash);
        this.playerCash = localStorage.getItem('spadeCash');
        this.playerCashText.setText(`$ ${this.playerCash}`);
      }
    });
    this.airfuelling.on('pointerover', () => {
      this.itemDescription.setText(
        'Pode pedir um avião de abastecimento apertando X.'
      );
    });
    this.airfuelling.on('pointerout', () => {
      this.itemDescription.setText('');
    });
  }

  gunUp() {
    const UPGRADE_VALUE = 2200;
    this.gunLvI = this.add.sprite(200, 530, 'cards', 2).setInteractive();
    this.gunLvIValue = this.add.text(172, 555, `$${UPGRADE_VALUE}`, {
      fontFamily: 'fontStandard',
      fontSize: 16,
    });
    if (this.upgradesPaid.mainGunI) {
      this.gunLvI.setAlpha(0.3);
      this.gunLvIValue.setAlpha(0.3);
    }
    this.gunLvI.on('pointerup', () => {
      if (this.upgradesPaid.mainGunI) return;
      if (parseInt(this.playerCash) >= UPGRADE_VALUE) {
        const playerLowerCash = parseInt(this.playerCash) - UPGRADE_VALUE;
        this.sound.play('coinSound');
        const upgrade = { ...this.upgradesPaid, mainGunI: true };
        this.gunLvI.setAlpha(0.3);
        this.gunLvIValue.setAlpha(0.3);
        localStorage.setItem('spadeUpgrades', JSON.stringify(upgrade));
        localStorage.setItem('spadeCash', playerLowerCash);
        this.playerCash = localStorage.getItem('spadeCash');
        this.playerCashText.setText(`$ ${this.playerCash}`);
      }
    });
    this.gunLvI.on('pointerover', () => {
      this.itemDescription.setText(
        'Inicia com o dobro de munição na arma principal.'
      );
    });
    this.gunLvI.on('pointerout', () => {
      this.itemDescription.setText('');
    });
  }

  missileIUp() {
    const UPGRADE_VALUE = 1500;
    this.missileI = this.add.sprite(320, 530, 'cards', 3).setInteractive();
    this.missileIValue = this.add.text(292, 555, `$${UPGRADE_VALUE}`, {
      fontFamily: 'fontStandard',
      fontSize: 16,
    });
    if (this.upgradesPaid.missileI) {
      this.missileI.setAlpha(0.3);
      this.missileIValue.setAlpha(0.3);
    }
    this.missileI.on('pointerup', () => {
      if (this.upgradesPaid.missileI) return;
      if (parseInt(this.playerCash) >= UPGRADE_VALUE) {
        const playerLowerCash = parseInt(this.playerCash) - UPGRADE_VALUE;
        this.sound.play('coinSound');
        const upgrade = { ...this.upgradesPaid, missileI: true };
        this.missileI.setAlpha(0.3);
        this.missileIValue.setAlpha(0.3);
        localStorage.setItem('spadeUpgrades', JSON.stringify(upgrade));
        localStorage.setItem('spadeCash', playerLowerCash);
        this.playerCash = localStorage.getItem('spadeCash');
        this.playerCashText.setText(`$ ${this.playerCash}`);
      }
    });
    this.missileI.on('pointerover', () => {
      this.itemDescription.setText('Começa com mais 1 míssil nos pods.');
    });
    this.missileI.on('pointerout', () => {
      this.itemDescription.setText('');
    });
  }

  missileIIUp() {
    const UPGRADE_VALUE = 3000;
    this.missileII = this.add.sprite(440, 530, 'cards', 4).setInteractive();
    this.missileIIValue = this.add.text(412, 555, `$${UPGRADE_VALUE}`, {
      fontFamily: 'fontStandard',
      fontSize: 16,
    });
    if (this.upgradesPaid.missileII) {
      this.missileII.setAlpha(0.3);
      this.missileIIValue.setAlpha(0.3);
    }
    this.missileII.on('pointerup', () => {
      if (this.upgradesPaid.missileII) return;
      if (parseInt(this.playerCash) >= UPGRADE_VALUE) {
        const playerLowerCash = parseInt(this.playerCash) - UPGRADE_VALUE;
        this.sound.play('coinSound');
        const upgrade = { ...this.upgradesPaid, missileII: true };
        this.missileII.setAlpha(0.3);
        this.missileIIValue.setAlpha(0.3);
        localStorage.setItem('spadeUpgrades', JSON.stringify(upgrade));
        localStorage.setItem('spadeCash', playerLowerCash);
        this.playerCash = localStorage.getItem('spadeCash');
        this.playerCashText.setText(`$ ${this.playerCash}`);
      }
    });
    this.missileII.on('pointerover', () => {
      this.itemDescription.setText('Começa com mais 2 mísseis nos pods.');
    });
    this.missileII.on('pointerout', () => {
      this.itemDescription.setText('');
    });
  }

  addCardsUpgrades() {
    this.engineECU();
    this.gunUp();
    this.missileIUp();
    this.missileIIUp();
    this.engineECUII();
    this.refuellingUp();
  }

  create() {
    this.add.tileSprite(400, 300, 800, 600, 'storeBackground');
    this.addInfos();
    this.addFont();
    this.backButtonMainMenu();
    this.addCardsUpgrades();
  }
}
