import Phaser from 'phaser';
import { fontPatternHUD, scorePatternHUD } from '../utils/fontPattern';
export class HUD extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    scene.add.existing(this);
    this.font = new FontFace(
      'fontStandard',
      'url(./assets/fonts/nasalization-rg.otf)'
    );
    this.addAmmoAndScoreInfo();
    this.addFuelInfo();
    this.scene.events.on('playerShoot', this.updateAmmo, this);
    this.scene.events.on('playerMissile', this.updateMissile, this);
    this.scene.events.on('consumeFuel', this.updateConsumeFuel, this);
    this.scene.events.on('refillBar', this.updateRefillFuelBar, this);
    this.scene.events.on('playerReload', this.updateAmmo, this);
    this.scene.events.on('playerReloadMissile', this.updateMissile, this);
    this.scene.events.on('enemyDestroy', this.updateScore, this);
  }

  addAmmoAndScoreInfo() {
    this.ammoIcon = this.scene.add.image(36, 20, 'ammoIcon');
    this.missileIcon = this.scene.add.image(140, 20, 'missileIcon');
    this.add(this.ammoIcon);
    this.add(this.missileIcon);
    this.font.load().then(
      function (loadedFont) {
        document.fonts.add(loadedFont);
        this.ammoText = this.scene.add.text(22, 10, '25', fontPatternHUD);
        this.missileText = this.scene.add.text(126, 10, '2', fontPatternHUD);
        this.score = this.scene.add.text(350, 10, '000000', scorePatternHUD);
      }.bind(this)
    );
  }

  addFuelInfo() {
    this.fuelIcon = this.scene.add.image(720, 20, 'fuelIcon');
    this.add(this.fuelIcon);
    this.fuelBar = this.scene.add
      .image(this.fuelIcon.x - 42, this.fuelIcon.y - 1, 'fuelBar')
      .setOrigin(0, 0.5);
    this.originalFuelBarWidth = this.fuelBar.width;
    this.currentFuel = 100;
  }

  updateScore(score) {
    if (this.score && this.score.active) {
      const scoreValue = parseInt(this.score.text);
      const scoreUpdate = scoreValue + score;
      if (scoreValue < 1000) {
        this.score.setText(`0000${scoreUpdate}`);
      } else if (scoreValue >= 1000) {
        this.score.setText(`000${scoreUpdate}`);
      } else if (scoreValue >= 10000) {
        this.score.setText(`00${scoreUpdate}`);
      } else {
        this.score.setText(`0${scoreUpdate}`);
      }
    }
  }

  updateAmmo(ammunitionCount) {
    if (this.ammoText && this.ammoText.active) {
      this.ammoText.setText(ammunitionCount);
    }
  }

  updateMissile(missileCount) {
    if (this.missileText && this.missileText.active) {
      this.missileText.setText(missileCount);
    }
  }

  updateConsumeFuel(amount) {
    this.currentFuel -= amount;
    if (this.currentFuel < 0) {
      this.currentFuel = 0;
    }
    const newWidth = (this.currentFuel / 100) * this.originalFuelBarWidth;
    this.fuelBar.displayWidth = newWidth;
  }

  updateRefillFuelBar() {
    this.fuelBar.displayWidth = this.originalFuelBarWidth;
    this.currentFuel = 100;
  }
}
