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

  checkCannonUpgrade() {
    if (this.upgradesPaid.mainGunI) return 50;
    return 25;
  }

  checkMissileUpgrade() {
    let MISSILE_INITIAL = 2;
    if (this.upgradesPaid.missileI) MISSILE_INITIAL += 1;
    if (this.upgradesPaid.missileII) MISSILE_INITIAL += 2;
    return MISSILE_INITIAL;
  }

  checkEngineIUpgrade() {
    if (this.upgradesPaid.engineLvI) return 2.5;
    return 5;
  }

  checkSpeedUpgrade() {
    if (this.upgradesPaid.engineLvII) return 180;
    return 150;
  }

  checkAirfuellingUpgrade() {
    if (this.upgradesPaid.airfuelling) return 1;
    return 0;
  }

  addBackground() {
    this.add.tileSprite(400, 300, 800, 600, 'sky');
    this.mountains = this.add.tileSprite(400, 300, 800, 600, 'mountains');
    this.forestBack = this.add.tileSprite(400, 300, 800, 600, 'forest_back');
    this.forestFront = this.add.tileSprite(400, 300, 800, 600, 'forest_front');
  }

  addPlayer(shootSound) {
    const PLAYER_SPEED = this.checkSpeedUpgrade();
    this.trailLayer = this.add.layer();
    this.players = this.add.group({
      classType: Player,
      runChildUpdate: true,
      maxSize: 1,
    });
    this.player = new Player(this, 40, 300, 'player', PLAYER_SPEED, shootSound);
    this.players.add(this.player);
  }

  createGroups() {
    this.supportPlanes = this.add.group({
      classType: KC,
      runChildUpdate: true,
      maxSize: 2,
    });
    this.fuelGallons = this.add.group({
      classType: FuelGallon,
      runChildUpdate: true,
      maxSize: 2,
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
    const fuelUse = this.checkEngineIUpgrade();
    this.fuelConsumption -= fuelUse;
    this.events.emit('consumeFuel', fuelUse);
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
    const hasSavedGame = localStorage.getItem('spadeScore');
    const playerCash = localStorage.getItem('spadeCash');
    if (hasSavedGame === null || undefined) {
      if (score <= 0) return;
      localStorage.setItem('spadeScore', score);
    } else if (parseInt(hasSavedGame) < score) {
      localStorage.setItem('spadeScore', score);
    }
    localStorage.setItem('spadeCash', score / 2 + parseInt(playerCash));
  }

  create() {
    this.upgradesPaid = JSON.parse(localStorage.getItem('spadeUpgrades'));
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
    this.forestFront.tilePositionX += 0.6;
    this.forestBack.tilePositionX += 0.4;
    this.mountains.tilePositionX += 0.1;
    if (this.fuelConsumption == 25) this.warningSound.play({ volume: 0.5 });
    if (this.fuelConsumption > 25) this.warningSound.stop();
    if (this.fuelConsumption == 0) this.gameover();
  }
}
