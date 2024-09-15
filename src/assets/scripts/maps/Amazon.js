import Phaser from 'phaser';
import { Player } from '../gameObjects/player/Player';
import { Enemy } from '../gameObjects/enemy/Enemy';
import { HUD } from '../hud/HUD';
import { KC } from '../gameObjects/kc/KC';
import { FuelGallon } from '../gameObjects/fuelgallon/FuelGallon';
import { AmmoBox } from '../gameObjects/ammobox/AmmoBox';
export class Amazon extends Phaser.Scene {
  constructor() {
    super('amazon');
    this.fuelConsumption = 100;
  }

  addBackground() {
    this.background = this.add.tileSprite(400, 300, 800, 600, 'sky');
  }

  addPlayer(shootSound) {
    this.trailLayer = this.add.layer();
    this.players = this.add.group({
      classType: Player,
      runChildUpdate: true,
      maxSize: 1,
    });
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
    this.ammoBoxs = this.add.group({
      classType: AmmoBox,
      runChildUpdate: true,
      maxSize: 1,
    });
    this.missileBoxs = this.add.group({
      classType: AmmoBox,
      runChildUpdate: true,
      maxSize: 1,
    });
    this.enemies = this.add.group({
      classType: Enemy,
      runChildUpdate: true,
      maxSize: 10,
    });
  }

  spawnEnemy() {
    const enemy = new Enemy(this);
    this.enemies.add(enemy);
  }

  configSounds() {
    this.shootSound = this.sound.add('shootAudio');
    this.explosionSound = this.sound.add('explosionAudio');
    this.warningSound = this.sound.add('warningAudio').setLoop(true);
    this.engineSound = this.sound
      .add('engineAudio')
      .setLoop(true)
      .setVolume(0.5);
  }

  objectHit(shoot, object) {
    if (!shoot || !object) return;
    this.add.sprite(object.x, object.y).play('explosion');
    this.explosionSound.play();
    shoot.destroy();
    object.destroy();
  }

  enemyHit(shoot, enemy) {
    if (!shoot || !enemy) return;
    this.add.sprite(enemy.x, enemy.y).play('explosion');
    this.explosionSound.play();
    this.events.emit('enemyDestroy', 100);
    shoot.destroy();
    enemy.destroy();
  }

  physicsColliders() {
    this.physics.add.collider(
      this.player.shoots,
      this.enemies,
      this.enemyHit,
      null,
      this
    );
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
    this.physics.add.collider(
      this.player,
      this.ammoBoxs,
      this.pickUpAmmoBox,
      null,
      this
    );
    this.physics.add.collider(
      this.player.shoots,
      this.ammoBoxs,
      this.objectHit,
      null,
      this
    );
    this.physics.add.collider(
      this.player.missiles,
      this.enemies,
      this.enemyHit,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.missileBoxs,
      this.pickUpAmmoBox,
      null,
      this
    );
    this.physics.add.collider(
      this.player.shoots,
      this.missileBoxs,
      this.objectHit,
      null,
      this
    );
    this.physics.add.collider(
      this.players,
      this.enemies,
      this.gameover,
      null,
      this
    );
  }

  fuelConsumer() {
    this.fuelConsumption -= 5;
    this.events.emit('consumeFuel', 5);
  }

  createTimes() {
    const FUEL_CONSUMER_DELAY = 5000;
    const AIR_REFUEL_DELAY = 25000;
    const AMMO_RELOAD_DELAY = 8000;
    const ENEMY_SPAWN_DELAY = 2000;
    const MISSILE_BOX_DELAY = 15000;

    this.time.addEvent({
      delay: FUEL_CONSUMER_DELAY,
      callback: this.fuelConsumer,
      callbackScope: this,
      loop: true,
    });
    this.time.addEvent({
      delay: AIR_REFUEL_DELAY,
      callback: this.spawnAirRefuel,
      callbackScope: this,
      loop: true,
    });
    this.time.addEvent({
      delay: AMMO_RELOAD_DELAY,
      callback: this.spawnAmmoBox,
      callbackScope: this,
      loop: true,
    });
    this.time.addEvent({
      delay: MISSILE_BOX_DELAY,
      callback: this.spawnMissileBox,
      callbackScope: this,
      loop: true,
    });
    this.time.addEvent({
      delay: ENEMY_SPAWN_DELAY,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true,
    });
  }

  spawnAirRefuel() {
    const kcPlane = new KC(this);
    this.supportPlanes.add(kcPlane);
  }

  spawnFuelGallon() {
    const fuelGallon = new FuelGallon(this);
    this.fuelGallons.add(fuelGallon);
  }

  spawnAmmoBox() {
    const ammoBox = new AmmoBox(this, 'ammoBox');
    this.ammoBoxs.add(ammoBox);
  }

  spawnMissileBox() {
    const MissileBox = new AmmoBox(this, 'missileBox');
    this.missileBoxs.add(MissileBox);
  }

  pickUpGallon(player, fuelGallon) {
    if (player.active === true && fuelGallon.active === true) {
      this.sound.play('pickupAudio');
      this.events.emit('refillBar');
      this.fuelConsumption = 100;
      fuelGallon.destroy();
    }
  }

  pickUpAmmoBox(player, ammoBox) {
    if (player.active === true && ammoBox.active === true) {
      if (ammoBox.texture.key === 'ammoBox') {
        this.player.ammunitionCount += 25;
        if (this.player.ammunitionCount > 150) {
          this.player.ammunitionCount = 150;
        }
        this.events.emit('playerReload', this.player.ammunitionCount);
      } else {
        this.player.missileCount += 2;
        if (this.player.missileCount > 5) {
          this.player.missileCount = 5;
        }
        this.events.emit('playerReloadMissile', this.player.missileCount);
      }
      this.sound.play('pickupAudio');
      ammoBox.destroy();
    }
  }

  createHUD() {
    this.hud = new HUD(this, 0, 0);
  }

  gameover() {
    const score = parseInt(this.hud.score.text);
    this.saveHighScore(score);
    this.input.stopPropagation();
    this.engineSound.stop();
    this.warningSound.stop();
    this.scene.stop(this);
    this.scene.start('gameover');
  }

  saveHighScore(score) {
    console.log(`recebi o score ${score}`);
    const hasSavedGame = localStorage.getItem('spadeScore');
    console.log(typeof hasSavedGame);
    console.log('peguei o save');
    if (hasSavedGame === null || undefined) {
      if (score <= 0) return;
      localStorage.setItem('spadeScore', score);
    } else if (parseInt(hasSavedGame) < score) {
      localStorage.setItem('spadeScore', score);
    }
  }

  create() {
    this.addBackground();
    this.createHUD();
    this.configSounds();
    this.createGroups();
    this.addPlayer(this.shootSound);
    this.engineSound.play();
    this.physicsColliders();
    this.createTimes();
    this.events.off('airFuelSupport', this.spawnFuelGallon, this); // remove event duplicate
    this.events.on('airFuelSupport', this.spawnFuelGallon, this);
    this.events.off('enemyPass', this.gameover, this); // remove event duplicate
    this.events.on('enemyPass', this.gameover, this);
  }

  update(time, delta) {
    if (this.fuelConsumption == 25) this.warningSound.play({ volume: 0.5 });
    if (this.fuelConsumption > 25) this.warningSound.stop();
    if (this.fuelConsumption == 0) this.gameover();
  }
}
