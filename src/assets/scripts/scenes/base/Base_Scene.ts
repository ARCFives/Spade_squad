import { IPlanesConfig } from 'assets/interfaces/IPlanesConfig';
import { IUpgrades } from 'assets/interfaces/IUpgrades';
import { AmmoBox } from 'assets/scripts/gameObjects/ammoBox/AmmoBox';
import { Contraband } from 'assets/scripts/gameObjects/enemy/air/Contraband';
import { EnemyBase } from 'assets/scripts/gameObjects/enemy/base/EnemyBase';
import { FuelGallon } from 'assets/scripts/gameObjects/fuelGallon/FuelGallon';
import { HUD } from 'assets/scripts/gameObjects/hud/HUD';
import { KC390 } from 'assets/scripts/gameObjects/kc390/KC390';
import { Player } from 'assets/scripts/gameObjects/player/Player';
import { AMX } from 'assets/scripts/planes/amx';
import { GRIPEN } from 'assets/scripts/planes/gripen';
import { TUCANO } from 'assets/scripts/planes/tucano';
import { GameObjects, Physics, Scene, Sound, Types, Math } from 'phaser';

// ########### VERIFY REQUIRED METHODS ###########

export abstract class BaseScene extends Scene {
  protected trailLayer!: GameObjects.Layer;
  protected hud!: HUD;
  protected player!: Player;
  protected players!: GameObjects.Group;
  protected ammoBoxsGroup!: GameObjects.Group;
  protected missileBoxGroup!: GameObjects.Group;
  protected supportPlanesGroup!: GameObjects.Group;
  protected fuelGallonsGroup!: GameObjects.Group;
  public enemiesGroup!: GameObjects.Group;
  protected abstract playerFuel: number;
  public abstract music: Sound.BaseSound;
  public warningSound!: Sound.BaseSound;
  public airplaneRefuelingSound!: Sound.BaseSound;
  public playerEngineSound!: Sound.BaseSound;
  protected sceneName: string;
  protected abstract configPlane: IPlanesConfig;
  protected upgradesPaid!: IUpgrades;
  private readonly AMMO_RELOAD_DELAY: number = 8000;
  private readonly MISSILE_BOX_DELAY: number = 15000;
  private readonly FUEL_CONSUME_DELAY: number = 5000;
  private readonly AIR_REFUEL_DELAY: number = 25000;
  private readonly ENEMY_SPAWN_DELAY: number = 2000;

  constructor(key: string) {
    super(key);
    this.sceneName = key;
  }

  // ####### REQUIRED IN "CREATE" METHOD SCENE AND METHODS (CONFIGSOUNDS, TIMERS, PHYSICSCOLLIDERS, CREATEGAMEOBJECTGROUPS)#######

  protected showHUD(): void {
    this.hud = new HUD(this, 0, 0);
  }

  protected loadUpgrades() {
    this.upgradesPaid = JSON.parse(
      localStorage.getItem('spadeUpgrades') as string,
    );
  }

  protected abstract addBackground(): void;

  protected abstract addMusic(): void;

  protected addPlayer(): void {
    this.trailLayer = this.add.layer();
    this.players = this.add.group({
      classType: Player,
      runChildUpdate: true,
      maxSize: 1,
    });
    this.player = new Player(
      this,
      this.configPlane.origin_X,
      this.configPlane.origin_Y,
      this.configPlane.id,
    );
    this.players.add(this.player);
    this.playerEngineSound.play();
  }

  protected enableEvent(): void {
    this.events.off('aerialRefueling', this.spawnFuelGallon, this); // remove event duplicate
    this.events.on('aerialRefueling', this.spawnFuelGallon, this);
    this.events.off('enemyPass', this.gameover, this); // remove event duplicate
    this.events.on('enemyPass', this.gameover, this);
  }

  public playerPlane(plane_id: string): IPlanesConfig {
    if (plane_id === 'tucano') return TUCANO;
    if (plane_id === 'amx') return AMX;
    if (plane_id === 'gripen') return GRIPEN;

    return TUCANO;
  }

  // ####### Physics #######

  protected physicsColliders(): void {
    // Pick ups colliders
    this.physics.add.collider(
      this.player,
      this.ammoBoxsGroup,
      this.pickUpAmmoBox as Types.Physics.Arcade.ArcadePhysicsCallback,
      null!,
      this,
    );
    this.physics.add.collider(
      this.player,
      this.missileBoxGroup,
      this.pickUpAmmoBox as Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this,
    );
    this.physics.add.collider(
      this.player,
      this.fuelGallonsGroup,
      this.pickUpFuelGallon as Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this,
    );

    // Objects Hit Colliders
    this.physics.add.collider(
      this.player.shoots,
      this.ammoBoxsGroup,
      this.objectHit as Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this,
    );
    this.physics.add.collider(
      this.player.shoots,
      this.fuelGallonsGroup,
      this.objectHit as Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this,
    );
    this.physics.add.collider(
      this.player.shoots,
      this.missileBoxGroup,
      this.objectHit as Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this,
    );

    // Enemies Colliders
    this.physics.add.collider(
      this.players,
      this.enemiesGroup,
      this.gameover,
      undefined,
      this,
    );
    this.physics.add.overlap(
      this.player.shoots,
      this.enemiesGroup,
      this.enemyShootDamage as Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this,
    );
    this.physics.add.collider(
      this.player.missiles,
      this.enemiesGroup,
      this.enemyMissileHit as Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this,
    );
  }

  protected createGameObjectsGroups(): void {
    this.ammoBoxsGroup = this.add.group({
      classType: AmmoBox,
      runChildUpdate: true,
      maxSize: 1,
    });
    this.missileBoxGroup = this.add.group({
      classType: AmmoBox,
      runChildUpdate: true,
      maxSize: 1,
    });
    this.fuelGallonsGroup = this.add.group({
      classType: FuelGallon,
      runChildUpdate: true,
      maxSize: 2,
    });
    this.enemiesGroup = this.add.group({
      classType: EnemyBase,
      runChildUpdate: true,
      maxSize: 10,
    });
    this.supportPlanesGroup = this.add.group({
      classType: KC390,
      runChildUpdate: true,
      maxSize: 2,
    });
  }

  private objectHit(
    shoot: Physics.Arcade.Sprite,
    object: Physics.Arcade.Sprite,
  ): void {
    if (!shoot || !object) return;
    this.add.sprite(object.x, object.y, 'explosion').play('explosion');
    this.sound.play('explosion_1');
    shoot.destroy();
    object.destroy();
  }

  private enemyMissileHit(
    shoot: Physics.Arcade.Sprite,
    enemy: Physics.Arcade.Sprite,
  ): void {
    if (!shoot || !enemy) return;
    this.add.sprite(enemy.x, enemy.y, 'explosion').play('explosion');
    this.sound.play(this.explosionSoundRandom());
    this.events.emit('enemyDestroy', 100);
    shoot.destroy();
    enemy.destroy();
  }

  private enemyShootDamage(enemy: EnemyBase, shoot: Physics.Arcade.Sprite) {
    if (!shoot || !enemy) return;
    const damage = shoot.getData('damage') || 10;
    this.sound.play('hit_tracer');
    enemy.takeDamage(damage);
    shoot.destroy();
  }

  private pickUpAmmoBox(
    player: Physics.Arcade.Sprite,
    ammoBox: Physics.Arcade.Sprite,
  ): void {
    if (player.active === true && ammoBox.active === true) {
      if (ammoBox.texture.key === 'ammoBox') {
        this.player.ammoCount += 25;
        if (this.player.ammoCount > this.configPlane.max_ammo) {
          this.player.ammoCount = this.configPlane.max_ammo;
        }
        this.events.emit('playerMainGunReload', this.player.ammoCount);
      } else {
        this.player.missileCount += 2;
        if (this.player.missileCount > this.configPlane.max_missile) {
          this.player.missileCount = this.configPlane.max_missile;
        }
        this.events.emit('playerMissileReload', this.player.missileCount);
      }
      this.sound.play('wp_reload');
      ammoBox.destroy();
    }
  }

  private pickUpFuelGallon(
    player: Physics.Arcade.Sprite,
    fuelGallon: Physics.Arcade.Sprite,
  ): void {
    if (player.active === true && fuelGallon.active === true) {
      this.sound.play('event_pickup');
      this.events.emit('playerPickUpFuelGallon');
      this.playerFuel = 100;
      this.warningSound.stop();
      fuelGallon.destroy();
    }
  }

  // ####### Sounds #######

  protected configSounds(): void {
    this.warningSound = this.sound.add('alarm_fuel', {
      loop: true,
      volume: 0.3,
    });
    this.airplaneRefuelingSound = this.sound.add('event_airplane', {
      volume: 0.2,
    });
    this.playerEngineSound = this.sound.add(this.configPlane.engine_sound, {
      loop: true,
      volume: 0.5,
    });
  }

  // ####### Timers #######

  protected timers(): void {
    this.time.addEvent({
      delay: this.AMMO_RELOAD_DELAY,
      callback: this.spawnAmmoBox,
      callbackScope: this,
      loop: true,
    });
    this.time.addEvent({
      delay: this.MISSILE_BOX_DELAY,
      callback: this.spawnMissileBox,
      callbackScope: this,
      loop: true,
    });
    this.time.addEvent({
      delay: this.FUEL_CONSUME_DELAY,
      callback: this.fuelConsume,
      callbackScope: this,
      loop: true,
    });
    this.time.addEvent({
      delay: this.AIR_REFUEL_DELAY,
      callback: this.spawnAirRefuelPlane,
      callbackScope: this,
      loop: true,
    });
    this.time.addEvent({
      delay: this.ENEMY_SPAWN_DELAY,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true,
    });
  }

  // ####### Spawn Events #######

  private spawnAmmoBox(): void {
    const ammoBox = new AmmoBox(this, 'ammoBox');
    this.ammoBoxsGroup.add(ammoBox);
  }

  private spawnMissileBox() {
    const MissileBox = new AmmoBox(this, 'missileBox');
    this.missileBoxGroup.add(MissileBox);
  }

  public spawnAirRefuelPlane(): void {
    const kcPlane = new KC390(this);
    this.supportPlanesGroup.add(kcPlane);
    this.airplaneRefuelingSound.play();
  }

  private spawnFuelGallon(): void {
    const fuelGallon = new FuelGallon(this);
    this.fuelGallonsGroup.add(fuelGallon);
  }

  private spawnEnemy(): void {
    const enemy = new Contraband(this);
    this.enemiesGroup.add(enemy);
  }

  // ####### Others #######

  private saveHighScore(score: number) {
    const hasSaveGame = localStorage.getItem('spadeScore');
    const playerCash = localStorage.getItem('spadeCash') as string;
    const saveScore: string = score.toString();
    if (hasSaveGame === null || undefined) {
      if (score <= 0) return;
      localStorage.setItem('spadeScore', saveScore);
    } else if (parseInt(hasSaveGame) < score) {
      localStorage.setItem('spadeScore', saveScore);
    }
    localStorage.setItem(
      'spadeCash',
      (score / 2 + parseInt(playerCash)).toString(),
    );
  }

  public explosionSoundRandom(): string {
    const RANDOM_NUMBER: number = Math.RND.integerInRange(1, 2);
    if (RANDOM_NUMBER === 1) {
      return 'explosion_1';
    } else {
      return 'explosion_2';
    }
  }

  // ####### Check Upgrades #######

  public checkMainGunUpgrade(): number {
    if (this.upgradesPaid.mainGunI) return this.configPlane.ammo_upgrade;
    return this.configPlane.initial_ammo;
  }

  public checkRefuelUpgrade(): number {
    if (this.upgradesPaid.airfuelling) return 1;
    return 0;
  }

  public checkEngineLvIIUpgrade(): number {
    if (this.upgradesPaid.engineLvI) return this.configPlane.max_speed;
    return this.configPlane.speed;
  }

  public checkEngineLvIUpgrade(): number {
    if (this.upgradesPaid.engineLvII) return this.configPlane.fuel_effiency;
    return this.configPlane.fuel_consuption;
  }

  public checkMissileUpgrade(): number {
    if (this.upgradesPaid.missileI) return this.configPlane.max_missile;
    return this.configPlane.initial_missile;
  }

  // REQUIRED IN SCENE METHOD "UPDATE"
  protected playerFuelConsumeUpdate(): void {
    if (this.playerFuel == 50) this.events.emit('fuelBarFrame', 50);
    if (this.playerFuel == 25) {
      this.warningSound.play();
      this.events.emit('fuelBarFrame', 25);
    }
    if (this.playerFuel == 0) this.gameover();
  }

  private fuelConsume(): void {
    const fuelUse = this.checkEngineLvIUpgrade();
    this.playerFuel -= fuelUse;
    this.events.emit('playerFlyFuelConsume', fuelUse);
  }

  public gameover(): void {
    const score = parseInt(this.hud.scoreText.text);
    this.saveHighScore(score);
    this.input.stopPropagation();
    this.playerEngineSound.stop();
    this.warningSound.stop();
    this.airplaneRefuelingSound.stop();
    this.music.stop();
    this.scene.stop(this.sceneName);
    this.scene.start('gameover');
  }
}
