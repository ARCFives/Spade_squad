import { GameObjects } from 'phaser';
import { BaseMenu } from './base/Base_Menu';
import { BaseScene } from '../scenes/base/Base_Scene';
import { IPauseGameText } from 'assets/interfaces/texts/IPauseGameText';

export class PauseMenu extends BaseMenu {
  private resume!: GameObjects.Text;
  private mainmenu!: GameObjects.Text;
  private sceneName!: string;

  constructor() {
    super('pausemenu');
  }

  public addButtons() {
    const getLanguage: IPauseGameText = this.checkLanguage(
      'pausemenu'
    ) as IPauseGameText;

    this.addButtonMenu(
      this.resume,
      300,
      230,
      `${getLanguage.resume}`,
      this.callResumeScene.bind(this)
    );
    this.addButtonMenu(
      this.mainmenu,
      250,
      290,
      `${getLanguage.mainMenu}`,
      this.callMainMenu.bind(this)
    );
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

  create() {
    this.sceneName = this.registry.get('sceneName');
    this.addButtons();
  }
}
