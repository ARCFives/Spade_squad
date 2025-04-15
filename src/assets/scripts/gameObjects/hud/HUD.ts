import { scoreTextHUD, textHUD } from 'assets/utils/textsConfig';
import { GameObjects, Scene } from 'phaser';

export class HUD extends GameObjects.Container {
    private ammoCountText!: GameObjects.Text;
    private missileCountText!: GameObjects.Text;
    public scoreText!: GameObjects.Text;
    private fuelBar!: GameObjects.Image;
    private originalFuelBarWidth!: number;
    private currentFuel!: number;

    constructor (scene: Scene, x: number, y: number) {
        super(scene, x, y);
        scene.add.existing(this);  
        this.addGunsAndScoreInfo();     
        this.addFuelInfo();
        this.scene.events.on('playerMainGun', this.updateAmmoCountScreen, this);
        this.scene.events.on('playerFireMissile', this.updateMissile, this);
        this.scene.events.on('playerMainGunReload', this.updateAmmoCountScreen, this);
        this.scene.events.on('playerMissileReload', this.updateMissile, this);
        this.scene.events.on('playerFlyFuelConsume', this.updateBarFuelConsume, this);
        this.scene.events.on('playerPickUpFuelGallon', this.updateBarFuelRefill, this);
        this.scene.events.on('enemyDestroy', this.updateScore, this);
    }

    private addGunsAndScoreInfo() {
        this.scene.add.image(36, 20, 'ammoIcon');
        this.scene.add.image(140, 20, 'missileIcon');
        document.fonts.load('18px fontStandard').then(() => {
            this.ammoCountText = this.scene.add.text(22, 10, '25', textHUD);
            this.missileCountText = this.scene.add.text(126, 10, '2', textHUD);
            this.scoreText = this.scene.add.text(350, 10, '000000', scoreTextHUD);
        });
    }

    private addFuelInfo() {
        this.scene.add.image(720, 20, 'fuelIcon');
        this.fuelBar = this.scene.add
            .image(678, 19, 'fuelBar')
            .setOrigin(0, 0.5);
        this.originalFuelBarWidth = this.fuelBar.width;
        this.currentFuel = 100;
    }

    private updateMissile(missileCount: string) {
        if (this.missileCountText && this.missileCountText.active) {
          this.missileCountText.setText(missileCount);
        }
      }

    private updateAmmoCountScreen(ammoCount: string) {
        if (this.ammoCountText && this.ammoCountText.active) {
            this.ammoCountText.setText(ammoCount);
          }
    }

    private updateBarFuelConsume(fuelConsume: number) {
        this.currentFuel -= fuelConsume;
        if (this.currentFuel < 0) {
          this.currentFuel = 0;
        }
        const newWidth: number = (this.currentFuel / 100) * this.originalFuelBarWidth;
        this.fuelBar.displayWidth = newWidth;
    }

    private updateBarFuelRefill() {
        this.fuelBar.displayWidth = this.originalFuelBarWidth;
        this.currentFuel = 100;
      }

    private updateScore(score: number) {
        if (this.scoreText && this.scoreText.active) {
          const scoreValue = parseInt(this.scoreText.text);
          const scoreUpdate = scoreValue + score;
          if (scoreValue < 1000) {
            this.scoreText.setText(`0000${scoreUpdate}`);
          } else if (scoreValue >= 1000) {
            this.scoreText.setText(`000${scoreUpdate}`);
          } else if (scoreValue >= 10000) {
            this.scoreText.setText(`00${scoreUpdate}`);
          } else {
            this.scoreText.setText(`0${scoreUpdate}`);
          }
        }
    }

    public getScoreCurrentLevel(): string {
      const score: string = this.scoreText.text;
      return score;
    }
}