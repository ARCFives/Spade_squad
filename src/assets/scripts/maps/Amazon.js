import Phaser from 'phaser';
import { Player } from '../gameObjects/player/Player';
import { Enemy } from '../gameObjects/enemy/enemy';
import { HUD } from '../hud/HUD';
import { KC } from '../gameObjects/kc/KC';
import { FuelGallon } from '../gameObjects/fuelgallon/FuelGallon';

export class Amazon extends Phaser.Scene {
  // ############## Enemy disabled, for tests ############
  constructor() {
    super('amazon');
    this.player = null;
    this.fuelConsu = 100;
  }

  addBackground() {
    this.background = this.add.tileSprite(400, 300, 800, 600, 'sky');
  }

  addPlayer(shootSound) {
    this.trailLayer = this.add.layer();
    this.players = this.add.group();
    this.player = new Player(this, 40, 300, 'player', 150, shootSound);
    this.players.add(this.player);
  }

  createGroups() {
    this.supportPlanes = this.add.group({
      classType: KC,
      runChildUpdate: true,
      maxSize: 1,
    });
    this.fuelGallons = this.add.group({
      classType: FuelGallon,
      runChildUpdate: true,
      maxSize: 1,
    });
  }

  enemiesGroup() {
    this.enemies = this.physics.add.group({
      classType: Enemy,
      runChildUpdate: true,
      maxSize: 10,
    });
    this.time.addEvent({
      delay: 2000,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true,
    });
  }

  spawnEnemy() {
    this.enemies.add(new Enemy(this));
  }

  configSounds() {
    this.shootSound = this.sound.add('shootAudio');
    this.explosionSound = this.sound.add('explosionAudio');
    this.warningSound = this.sound.add('warningAudio').setLoop(true);
  }

  objectHit(shoot, object) {
    this.add.sprite(object.x, object.y).play('explosion');
    this.explosionSound.play();
    shoot.destroy();
    object.destroy();
  }

  physicsColliders() {
    // this.physics.add.collider(
    //   this.player.shoots,
    //   this.enemies,
    //   this.enemyHit,
    //   null,
    //   this
    // );
    this.physics.add.collider(
      this.player,
      this.fuelGallons,
      this.pickUpGallon,
      null,
      this
    );
    this.physics.add.collider(
      this.player.shoots,
      this.fuelGallons,
      this.objectHit,
      null,
      this
    );
  }

  fuelConsumer() {
    this.fuelConsu -= 5;
    this.events.emit('consumeFuel', 5);
  }

  createTimes() {
    this.time.addEvent({
      delay: 5000,
      callback: this.fuelConsumer,
      callbackScope: this,
      loop: true,
    });
    this.time.addEvent({
      delay: 25000,
      callback: this.spawnAirRefuel,
      callbackScope: this,
      loop: true,
    });
  }

  spawnAirRefuel() {
    this.supportPlanes.add(new KC(this));
  }

  spawnFuelGallon() {
    this.fuelGallons.add(new FuelGallon(this));
  }

  pickUpGallon(player, fuelGallon) {
    if (player.active === true || fuelGallon == true) {
      this.sound.play('pickupAudio');
      this.events.emit('refillBar');
      this.fuelConsu = 100;
      fuelGallon.destroy();
    }
  }

  create() {
    this.addBackground();
    this.hud = new HUD(this, 0, 0);
    this.configSounds();
    this.createGroups();
    this.addPlayer(this.shootSound);
    this.physicsColliders();
    this.createTimes();
    this.events.on('airSupportFuel', this.spawnFuelGallon, this);
    // this.enemiesGroup();
    // this.physicsColliders();
  }

  update(time, delta) {
    if (this.player) this.player.update(time);
    if (this.fuelConsu == 25) this.warningSound.play({ volume: 0.5 });
    if (this.fuelConsu > 25) this.warningSound.stop();
    if (this.fuelConsu == 0) console.log('gameover');
    // this.enemies.children.iterate(function (enemy) {
    //     enemy.update();
    // });
  }
}
