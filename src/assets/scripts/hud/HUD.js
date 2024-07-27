import Phaser from 'phaser';
import { fontPatternHUD } from '../utils/fontPattern';
export class HUD extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    scene.add.existing(this);
    this.font = new FontFace(
      'fontStandard',
      'url(./assets/fonts/nasalization-rg.otf)'
    );
    this.addAmmoInfo();
    this.addFuelInfo();
    this.scene.events.on('playerShoot', this.updateAmmo, this);
    this.scene.events.on('consumeFuel', this.updateConsumeFuel, this);
    this.scene.events.on('refillBar', this.updateRefillFuelBar, this);
  }

  addAmmoInfo() {
    this.ammoIcon = this.scene.add.image(36, 20, 'ammoIcon');
    this.add(this.ammoIcon);
    this.font.load().then(
      function (loadedFont) {
        document.fonts.add(loadedFont);
        this.ammoText = this.scene.add.text(22, 10, '25', fontPatternHUD);
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

  updateAmmo(ammunitionCount) {
    if (this.ammoText && this.ammoText.active) {
      this.ammoText.setText(ammunitionCount);
    } else {
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
