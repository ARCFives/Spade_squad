import Phaser from 'phaser';

export class HUD extends Phaser.GameObjects.Container {
    constructor(scene, x , y) {
        super(scene, x , y);
        scene.add.existing(this);
        this.ammoIcon = this.scene.add.image(36, 20,'ammoIcon');
        this.add(this.ammoIcon);
        this.font = new FontFace('fontStandard', 'url(./assets/fonts/nasalization-rg.otf)');
        this.font.load().then(function(loadedFont) {
            document.fonts.add(loadedFont);
            this.ammotText = this.scene.add.text(22, 10, '25', {
                fontFamily: 'fontStandard',
                fontSize: 18,
                color: '#00ff00',
                stroke: '#00aa00',
                strokeThickness: 1,
                shadow: {
                    offsetX: 0,
                    offsetY: 0,
                    color: '#00ff00',
                    blur: 18,
                    stroke: true,
                    fill: true
                }
            } );
            this.add(this.ammotText);
        }.bind(this));
        this.scene.events.on('playerShoot', this.updateAmmo, this);
    }

    updateAmmo(ammunitionCount) {
        this.ammotText.setText(ammunitionCount);
    }
}