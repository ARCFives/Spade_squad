import Phaser from 'phaser';
import { menuInterativeText, menuPatternText } from '../utils/fontPattern';
import { gameConfig } from '../config/gameConfig';

export class MainMenu extends Phaser.Scene {
    constructor() {
        super('mainmenu');
    }

    addStartButton() {
        this.startButton = this.add.text(320, 300, 'Iniciar', menuPatternText).setInteractive();
        this.startButton.on('pointerover', () => this.startButton.setStyle(menuInterativeText));
        this.startButton.on('pointerout', () => this.startButton.setColor('#008800'));
        this.startButton.on('pointerup', () => {
            this.sound.play('menuAudio');
            this.time.delayedCall(500, this.startGame, null, this);
            
        });
    }

    addControlsButton() {
        this.controlsButton = this.add.text(280, 360, 'Controles', menuPatternText).setInteractive();
        this.controlsButton.on('pointerover', () => this.controlsButton.setStyle(menuInterativeText));
        this.controlsButton.on('pointerout', () => this.controlsButton.setColor('#008800'));
        this.controlsButton.on('pointerup', () => {
            this.sound.play('menuAudio');
            console.log('controle menu');
        });
    }

    startGame() {
        this.scene.stop('mainmenu');
        this.scene.start('amazon');
    }

    create() {
        this.font = new FontFace('fontStandard', 'url(./assets/fonts/nasalization-rg.otf)');
        this.spadeFont = new FontFace('fontSpade', 'url(./assets/fonts/TarrgetAcademyRegular.otf)');
        this.spadeFont.load().then(function(loadFont) {
            document.fonts.add(loadFont);
            this.add.text(20, 150, 'Spade Squad', {fontFamily: 'fontSpade', fontSize: 84, color: '#eeeeee'});
            this.font.load().then(function(loadedFont) {
                document.fonts.add(loadedFont);
                this.addStartButton();
                this.addControlsButton();
                this.add.text(740, 580, `V ${gameConfig.version}`, {fontFamily: 'fontStandard', fontSize: 14, color: '#ddd'});
            }.bind(this));
         }.bind(this));
    }
}