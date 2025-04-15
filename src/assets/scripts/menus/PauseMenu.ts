import { GameObjects} from 'phaser';
import { BaseMenu } from './base/Base_Menu';
import { BaseScene } from '../scenes/base/Base_Scene';
import { language } from 'assets/utils/languages';
import { IPauseGameText } from 'assets/interfaces/texts/IPauseGameText';

export class PauseMenu extends BaseMenu {
  private resume!: GameObjects.Text;
  private mainmenu!: GameObjects.Text;
  private sceneName!: string;

  constructor() {
    super('pausemenu');
  }

  public addButtons(){
    const getLanguage: IPauseGameText = this.checkLanguage() as IPauseGameText;

    this.addButtonMenu(this.resume, 300, 230, `${getLanguage.resume}`, this.callResumeScene.bind(this));
    this.addButtonMenu(this.mainmenu, 250, 290, `${getLanguage.mainMenu}`, this.callMainMenu.bind(this));
  }

  private callResumeScene() {
    this.scene.resume(this.sceneName);
    this.scene.stop('pausemenu');
  }

  private callMainMenu() {
    this.input.stopPropagation();
    this.scene.stop(this.sceneName);
    this.scene.stop(this);
    const sceneGame: BaseScene = this.scene.get(this.sceneName) as BaseScene;
    sceneGame.playerEngineSound.stop();
    sceneGame.airplaneRefuelingSound.stop();
    sceneGame.warningSound.stop();
    sceneGame.music.stop();
    this.scene.start('mainmenu');
  }

  protected checkLanguage() {
      const getLanguage = localStorage.getItem('spade-language') as string;
      if(getLanguage === 'portugues') return language.portugues.pauseGame;
      if(getLanguage === 'english') return language.english.pauseGame;
  }

  create() {
    this.sceneName = this.registry.get('sceneName');
    this.addButtons();
  }
}
