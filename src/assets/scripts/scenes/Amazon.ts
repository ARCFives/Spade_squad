import { GameObjects } from 'phaser';
import { BaseScene } from './base/Base_Scene';
import { IPlanesConfig } from 'assets/interfaces/IPlanesConfig';
export class Amazon extends BaseScene {
  protected configPlane!: IPlanesConfig;
  protected playerFuel!: number;
  private mountains!: GameObjects.TileSprite;
  private forestBack!: GameObjects.TileSprite;
  private forestFront!: GameObjects.TileSprite;
  music!: Phaser.Sound.BaseSound;

  constructor() {
    super('amazon');
  }

  addBackground() {
    this.add.tileSprite(400, 300, 800, 600, 'sky');
    this.mountains = this.add.tileSprite(400, 300, 800, 600, 'mountains');
    this.forestBack = this.add.tileSprite(400, 300, 800, 600, 'forest_back');
    this.forestFront = this.add.tileSprite(400, 300, 800, 600, 'forest_front');
  }

  addMusic() {
    this.music = this.sound.add('levelAmazonMusic', {
      volume: 0.4,
      loop: true,
    });
    this.music.play();
  }

  create() {
    this.configPlane = this.playerPlane(this.registry.get('playerAircraft'));
    this.playerFuel = 100;
    this.addBackground();
    this.showHUD();
    this.configSounds();
    this.createGameObjectsGroups();
    this.addPlayer();
    this.physicsColliders();
    this.timers();
    this.enableEvent();
    this.addMusic();
    this.registry.set('sceneName', 'amazon');
  }

  update() {
    this.forestFront.tilePositionX += 0.6;
    this.forestBack.tilePositionX += 0.4;
    this.mountains.tilePositionX += 0.1;
    this.playerFuelConsumeUpdate();
  }
}
