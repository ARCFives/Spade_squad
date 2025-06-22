import { GameObjects } from 'phaser';
import { BaseMenu } from './base/Base_Menu';
import { storeText } from 'assets/utils/textsConfig';
import { IPlayerStoreUpgrades } from 'assets/interfaces/IPlayerStoreUpgrades';
import { UPGRADES_VALUE } from 'assets/utils/constants_variables';
import { IUpgrades } from 'assets/interfaces/IUpgrades';
import { IStoreText } from 'assets/interfaces/texts/IStoreText';
import { IPlayerAircraftHidden } from 'assets/interfaces/IPlayerAircraftHidden';

export class StoreMenu extends BaseMenu {
  private upgradesPaid!: IUpgrades;
  private aircraftsUnlock!: IPlayerAircraftHidden;
  private playerCash!: string;
  private itemDescription!: GameObjects.Text;
  private playerCashText!: GameObjects.Text;
  private playerUpgradesStore!: IPlayerStoreUpgrades;

  constructor() {
    super('store');
  }

  protected addButtons() {
    this.addInfos();
    this.addCardsUpgrades();
  }

  private setUpgradesValues() {
    this.playerUpgradesStore = {
      engineLvI: this.add.sprite(200, 420, 'cards', 0).setInteractive(),
      engineLvIValue: this.add.text(
        172,
        445,
        `$${UPGRADES_VALUE.engineLvI}`,
        storeText
      ),
      engineLvII: this.add.sprite(320, 420, 'cards', 1).setInteractive(),
      engineLvIIValue: this.add.text(
        292,
        445,
        `$${UPGRADES_VALUE.engineLvII}`,
        storeText
      ),
      missileI: this.add.sprite(320, 530, 'cards', 3).setInteractive(),
      missileIValue: this.add.text(
        292,
        555,
        `$${UPGRADES_VALUE.missileI}`,
        storeText
      ),
      aircraftLvI: this.add.sprite(440, 530, 'cards', 6).setInteractive(),
      aircraftLvIValue: this.add.text(
        412,
        555,
        `$${UPGRADES_VALUE.aircraftLvI}`,
        storeText
      ),
      gunLvI: this.add.sprite(200, 530, 'cards', 2).setInteractive(),
      gunLvIValue: this.add.text(
        172,
        555,
        `$${UPGRADES_VALUE.gunLvI}`,
        storeText
      ),
      airfuelling: this.add.sprite(440, 420, 'cards', 5).setInteractive(),
      airfuellingValue: this.add.text(
        412,
        445,
        `$${UPGRADES_VALUE.airfuelling}`,
        storeText
      ),
      aircraftLvII: this.add.sprite(560, 530, 'cards', 7).setInteractive(),
      aircraftLvIIValue: this.add.text(
        532,
        555,
        `$${UPGRADES_VALUE.aircraftLvII}`,
        storeText
      ),
    };
  }

  private addInfos() {
    this.upgradesPaid = JSON.parse(
      localStorage.getItem('spadeUpgrades') as string
    );
    this.aircraftsUnlock = JSON.parse(
      localStorage.getItem('spadePlayerAircraft') as string
    );
    this.playerCash = localStorage.getItem('spadeCash') as string;
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

  private engineECU(description: string) {
    if (this.upgradesPaid.engineLvI) {
      this.playerUpgradesStore.engineLvI.setAlpha(0.3);
      this.playerUpgradesStore.engineLvIValue.setAlpha(0.3);
    }
    this.playerUpgradesStore.engineLvI.on('pointerup', () => {
      if (this.upgradesPaid.engineLvI) return;
      if (parseInt(this.playerCash) >= UPGRADES_VALUE.engineLvI) {
        const playerLowerCash =
          parseInt(this.playerCash) - UPGRADES_VALUE.engineLvI;
        this.sound.play('coinSound');
        const upgrade = { ...this.upgradesPaid, engineLvI: true };
        this.playerUpgradesStore.engineLvI.setAlpha(0.3);
        this.playerUpgradesStore.engineLvIValue.setAlpha(0.3);
        localStorage.setItem('spadeUpgrades', JSON.stringify(upgrade));
        localStorage.setItem('spadeCash', playerLowerCash.toString());
        this.playerCash = localStorage.getItem('spadeCash') as string;
        this.playerCashText.setText(`$ ${this.playerCash}`);
      }
    });
    this.playerUpgradesStore.engineLvI.on('pointerover', () => {
      if (this.upgradesPaid.engineLvI) return;
      this.itemDescription.setText(`${description}`);
    });
    this.playerUpgradesStore.engineLvIValue.on('pointerout', () => {
      this.itemDescription.setText('');
    });
  }

  private engineECUII(description: string) {
    if (this.upgradesPaid.engineLvII) {
      this.playerUpgradesStore.engineLvII.setAlpha(0.3);
      this.playerUpgradesStore.engineLvIIValue.setAlpha(0.3);
    }
    this.playerUpgradesStore.engineLvII.on('pointerup', () => {
      if (this.upgradesPaid.engineLvII || !this.upgradesPaid.engineLvI) return;
      if (parseInt(this.playerCash) >= UPGRADES_VALUE.engineLvII) {
        const playerLowerCash =
          parseInt(this.playerCash) - UPGRADES_VALUE.engineLvII;
        this.sound.play('coinSound');
        const upgrade = { ...this.upgradesPaid, engineLvII: true };
        this.playerUpgradesStore.engineLvII.setAlpha(0.3);
        this.playerUpgradesStore.engineLvIIValue.setAlpha(0.3);
        localStorage.setItem('spadeUpgrades', JSON.stringify(upgrade));
        localStorage.setItem('spadeCash', playerLowerCash.toString());
        this.playerCash = localStorage.getItem('spadeCash') as string;
        this.playerCashText.setText(`$ ${this.playerCash}`);
      }
    });
    this.playerUpgradesStore.engineLvII.on('pointerover', () => {
      if (this.upgradesPaid.engineLvII) return;
      this.itemDescription.setText(`${description}`);
    });
    this.playerUpgradesStore.engineLvII.on('pointerout', () => {
      this.itemDescription.setText('');
    });
  }

  private refuellingUp(description: string) {
    if (this.upgradesPaid.airfuelling) {
      this.playerUpgradesStore.airfuelling.setAlpha(0.3);
      this.playerUpgradesStore.airfuellingValue.setAlpha(0.3);
    }
    this.playerUpgradesStore.airfuelling.on('pointerup', () => {
      if (this.upgradesPaid.airfuelling || !this.upgradesPaid.engineLvII)
        return;
      if (parseInt(this.playerCash) >= UPGRADES_VALUE.airfuelling) {
        const playerLowerCash =
          parseInt(this.playerCash) - UPGRADES_VALUE.airfuelling;
        this.sound.play('coinSound');
        const upgrade = { ...this.upgradesPaid, airfuelling: true };
        this.playerUpgradesStore.airfuelling.setAlpha(0.3);
        this.playerUpgradesStore.airfuellingValue.setAlpha(0.3);
        localStorage.setItem('spadeUpgrades', JSON.stringify(upgrade));
        localStorage.setItem('spadeCash', playerLowerCash.toString());
        this.playerCash = localStorage.getItem('spadeCash') as string;
        this.playerCashText.setText(`$ ${this.playerCash}`);
      }
    });
    this.playerUpgradesStore.airfuelling.on('pointerover', () => {
      if (this.upgradesPaid.airfuelling) return;
      this.itemDescription.setText(`${description}`);
    });
    this.playerUpgradesStore.airfuelling.on('pointerout', () => {
      this.itemDescription.setText('');
    });
  }

  private gunUp(description: string) {
    if (this.upgradesPaid.mainGunI) {
      this.playerUpgradesStore.gunLvI.setAlpha(0.3);
      this.playerUpgradesStore.gunLvIValue.setAlpha(0.3);
    }
    this.playerUpgradesStore.gunLvI.on('pointerup', () => {
      if (this.upgradesPaid.mainGunI) return;
      if (parseInt(this.playerCash) >= UPGRADES_VALUE.gunLvI) {
        const playerLowerCash =
          parseInt(this.playerCash) - UPGRADES_VALUE.gunLvI;
        this.sound.play('coinSound');
        const upgrade = { ...this.upgradesPaid, mainGunI: true };
        this.playerUpgradesStore.gunLvI.setAlpha(0.3);
        this.playerUpgradesStore.gunLvIValue.setAlpha(0.3);
        localStorage.setItem('spadeUpgrades', JSON.stringify(upgrade));
        localStorage.setItem('spadeCash', playerLowerCash.toString());
        this.playerCash = localStorage.getItem('spadeCash') as string;
        this.playerCashText.setText(`$ ${this.playerCash}`);
      }
    });
    this.playerUpgradesStore.gunLvI.on('pointerover', () => {
      if (this.upgradesPaid.mainGunI) return;
      this.itemDescription.setText(`${description}`);
    });
    this.playerUpgradesStore.gunLvI.on('pointerout', () => {
      this.itemDescription.setText('');
    });
  }

  private missileIUp(description: string) {
    if (this.upgradesPaid.missileI) {
      this.playerUpgradesStore.missileI.setAlpha(0.3);
      this.playerUpgradesStore.missileIValue.setAlpha(0.3);
    }
    this.playerUpgradesStore.missileI.on('pointerup', () => {
      if (this.upgradesPaid.missileI) return;
      if (parseInt(this.playerCash) >= UPGRADES_VALUE.missileI) {
        const playerLowerCash =
          parseInt(this.playerCash) - UPGRADES_VALUE.missileI;
        this.sound.play('coinSound');
        const upgrade = { ...this.upgradesPaid, missileI: true };
        this.playerUpgradesStore.missileI.setAlpha(0.3);
        this.playerUpgradesStore.missileIValue.setAlpha(0.3);
        localStorage.setItem('spadeUpgrades', JSON.stringify(upgrade));
        localStorage.setItem('spadeCash', playerLowerCash.toString());
        this.playerCash = localStorage.getItem('spadeCash') as string;
        this.playerCashText.setText(`$ ${this.playerCash}`);
      }
    });
    this.playerUpgradesStore.missileI.on('pointerover', () => {
      if (this.upgradesPaid.missileI) return;
      this.itemDescription.setText(`${description}`);
    });
    this.playerUpgradesStore.missileI.on('pointerout', () => {
      this.itemDescription.setText('');
    });
  }

  private amxUnlock(description: string) {
    if (this.aircraftsUnlock.amx) {
      this.playerUpgradesStore.aircraftLvI.setAlpha(0.3);
      this.playerUpgradesStore.aircraftLvIValue.setAlpha(0.3);
    }
    this.playerUpgradesStore.aircraftLvI.on('pointerup', () => {
      if (this.aircraftsUnlock.amx) return;
      if (parseInt(this.playerCash) >= UPGRADES_VALUE.aircraftLvI) {
        const playerLowerCash =
          parseInt(this.playerCash) - UPGRADES_VALUE.aircraftLvI;
        this.sound.play('coinSound');
        const upgrade = { ...this.aircraftsUnlock, amx: true };
        this.playerUpgradesStore.aircraftLvI.setAlpha(0.3);
        this.playerUpgradesStore.aircraftLvIValue.setAlpha(0.3);
        localStorage.setItem('spadePlayerAircraft', JSON.stringify(upgrade));
        localStorage.setItem('spadeCash', playerLowerCash.toString());
        this.playerCash = localStorage.getItem('spadeCash') as string;
        this.playerCashText.setText(`$ ${this.playerCash}`);
      }
    });
    this.playerUpgradesStore.aircraftLvI.on('pointerover', () => {
      if (this.aircraftsUnlock.amx) return;
      this.itemDescription.setText(`${description}`);
    });
    this.playerUpgradesStore.aircraftLvI.on('pointerout', () => {
      this.itemDescription.setText('');
    });
  }

  private gripenUnlock(description: string) {
    if (this.aircraftsUnlock.gripen) {
      this.playerUpgradesStore.aircraftLvII.setAlpha(0.3);
      this.playerUpgradesStore.aircraftLvIIValue.setAlpha(0.3);
    }
    this.playerUpgradesStore.aircraftLvII.on('pointerup', () => {
      if (this.aircraftsUnlock.gripen) return;
      if (parseInt(this.playerCash) >= UPGRADES_VALUE.aircraftLvII) {
        const playerLowerCash =
          parseInt(this.playerCash) - UPGRADES_VALUE.aircraftLvII;
        this.sound.play('coinSound');
        const upgrade = { ...this.aircraftsUnlock, gripen: true };
        this.playerUpgradesStore.aircraftLvII.setAlpha(0.3);
        this.playerUpgradesStore.aircraftLvIIValue.setAlpha(0.3);
        localStorage.setItem('spadePlayerAircraft', JSON.stringify(upgrade));
        localStorage.setItem('spadeCash', playerLowerCash.toString());
        this.playerCash = localStorage.getItem('spadeCash') as string;
        this.playerCashText.setText(`$ ${this.playerCash}`);
      }
    });
    this.playerUpgradesStore.aircraftLvII.on('pointerover', () => {
      if (this.aircraftsUnlock.gripen) return;
      this.itemDescription.setText(`${description}`);
    });
    this.playerUpgradesStore.aircraftLvII.on('pointerout', () => {
      this.itemDescription.setText('');
    });
  }

  private addCardsUpgrades() {
    const getLanguage: IStoreText = this.checkLanguage(
      'storemenu'
    ) as IStoreText;

    this.engineECU(getLanguage.engineIDescription);
    this.gunUp(getLanguage.gunIDescription);
    this.missileIUp(getLanguage.missileIDescription);
    this.amxUnlock(getLanguage.aircraftLvIDescription);
    this.gripenUnlock(getLanguage.aircraftLvIIDescription);
    this.engineECUII(getLanguage.engineIIDescription);
    this.refuellingUp(getLanguage.refuellingDescription);
  }

  create() {
    this.add.tileSprite(400, 300, 800, 600, 'storeBackground');
    this.setUpgradesValues();
    this.addButtons();
    this.backButtonMainMenu();
  }
}
