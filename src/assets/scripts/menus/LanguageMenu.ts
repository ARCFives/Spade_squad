import { GameObjects } from 'phaser';
import { BaseMenu } from './base/Base_Menu';

export class LanguageMenu extends BaseMenu {
    private portuguese!: GameObjects.Text;
    private english!: GameObjects.Text;

    constructor() {
        super('language');
    }

    protected addButtons(){
        this.add.text(260, 80, 'Escolha o idioma', { fontFamily: 'fontStandard', fontSize: 36,color: '#fff'});
        this.addButtonMenu(this.portuguese, 320, 260, 'Português', this.setPortugues.bind(this));
        this.addButtonMenu(this.english, 340, 320, 'English', this.setEnglish.bind(this));
    }

    create(){
        this.addButtons();
    }

    private setPortugues() {
       localStorage.setItem('spade-language', 'portugues');
       this.scene.stop(this);
       this.scene.start('mainmenu');
    }

    private setEnglish() {
        localStorage.setItem('spade-language', 'english');
        this.scene.stop(this);
        this.scene.start('mainmenu');
    }
}