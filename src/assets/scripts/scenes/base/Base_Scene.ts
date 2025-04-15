import { AmmoBox } from 'assets/scripts/gameObjects/ammoBox/AmmoBox';
import { Enemy } from 'assets/scripts/gameObjects/enemy/Enemy';
import { FuelGallon } from 'assets/scripts/gameObjects/fuelGallon/FuelGallon';
import { HUD } from 'assets/scripts/gameObjects/hud/HUD';
import { KC390 } from 'assets/scripts/gameObjects/kc390/KC390';
import { Player } from 'assets/scripts/gameObjects/player/Player';
import { GameObjects, Physics, Scene, Sound, Types} from 'phaser';

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
    
    constructor(key: string) {
        super(key);
        this.sceneName = key;
    }

    // ####### REQUIRED IN "CREATE" METHOD SCENE AND METHODS (CONFIGSOUNDS, TIMERS, PHYSICSCOLLIDERS, CREATEGAMEOBJECTGROUPS)#######

    protected showHUD(): void {
      this.hud = new HUD(this, 0, 0);
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
      this.player = new Player(this, 40, 300, 'player', 150);
      this.players.add(this.player);
      this.playerEngineSound.play();
    }

    protected enableEvent(): void {
      this.events.off('aerialRefueling', this.spawnFuelGallon, this); // remove event duplicate
      this.events.on('aerialRefueling', this.spawnFuelGallon, this);
      this.events.off('enemyPass', this.gameover, this); // remove event duplicate
      this.events.on('enemyPass', this.gameover, this);
    }

    // ####### Physics #######

    protected physicsColliders(): void {
      // Pick ups colliders
      this.physics.add.collider(
        this.player,
        this.ammoBoxsGroup,
        this.pickUpAmmoBox as Types.Physics.Arcade.ArcadePhysicsCallback,
        null!,
        this
      );
      this.physics.add.collider(
        this.player,
        this.missileBoxGroup,
        this.pickUpAmmoBox as Types.Physics.Arcade.ArcadePhysicsCallback,
        undefined,
        this
      );
      this.physics.add.collider(
        this.player,
        this.fuelGallonsGroup,
        this.pickUpFuelGallon as Types.Physics.Arcade.ArcadePhysicsCallback,
        undefined,
        this
      );

      // Objects Hit Colliders
      this.physics.add.collider(
        this.player.shoots,
        this.ammoBoxsGroup,
        this.objectHit as Types.Physics.Arcade.ArcadePhysicsCallback,
        undefined,
        this
      );     
      this.physics.add.collider(
        this.player.shoots,
        this.fuelGallonsGroup,
        this.objectHit as Types.Physics.Arcade.ArcadePhysicsCallback,
        undefined,
        this
      );
      this.physics.add.collider(
        this.player.shoots,
        this.missileBoxGroup,
        this.objectHit as Types.Physics.Arcade.ArcadePhysicsCallback,
        undefined,
        this
      );

      // Enemies Colliders
      this.physics.add.collider(
        this.players,
        this.enemiesGroup,
        this.gameover,
        undefined,
        this
      );
      this.physics.add.collider(
        this.player.shoots,
        this.enemiesGroup,
        this.enemyHit as Types.Physics.Arcade.ArcadePhysicsCallback,
        undefined,
        this
      );
      this.physics.add.collider(
        this.player.missiles,
        this.enemiesGroup,
        this.enemyHit as Types.Physics.Arcade.ArcadePhysicsCallback,
        undefined,
        this
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
        classType: Enemy,
        runChildUpdate: true,
        maxSize: 10,
      });
      this.supportPlanesGroup = this.add.group({
        classType: KC390,
        runChildUpdate: true,
        maxSize: 2,
      });

    }

    private objectHit(shoot: Physics.Arcade.Sprite, object: Physics.Arcade.Sprite): void {
      console.log(shoot);
      console.log(object);
        if (!shoot || !object) return;
        this.add.sprite(object.x, object.y, 'explosion').play('explosion');
        this.sound.play('explosionAudio');
        shoot.destroy();
        object.destroy();
    }

    private enemyHit(shoot: Physics.Arcade.Sprite, enemy: Physics.Arcade.Sprite): void {
      if (!shoot || !enemy) return;
      this.add.sprite(enemy.x, enemy.y, 'explosion').play('explosion');
      this.sound.play('explosionAudio');
      this.events.emit('enemyDestroy', 100);
      shoot.destroy();
      enemy.destroy();
    }

    private pickUpAmmoBox(player: Physics.Arcade.Sprite, ammoBox: Physics.Arcade.Sprite): void {
      if (player.active === true && ammoBox.active === true) {
        if (ammoBox.texture.key === 'ammoBox') {
          this.player.ammoCount += 25;
          if (this.player.ammoCount > 150) {
            this.player.ammoCount = 150;
          }
          this.events.emit('playerMainGunReload', this.player.ammoCount);
        } else {
            this.player.missileCount += 2;
            if (this.player.missileCount > 5) {
              this.player.missileCount = 5;
            }
            this.events.emit('playerMissileReload', this.player.missileCount);
          }
        this.sound.play('pickupAudio');
        ammoBox.destroy();
      }
    }

    private pickUpFuelGallon(player: Physics.Arcade.Sprite, fuelGallon: Physics.Arcade.Sprite): void {
      if (player.active === true && fuelGallon.active === true) {
        this.sound.play('pickupAudio');
        this.events.emit('playerPickUpFuelGallon');
        this.playerFuel = 100;
        this.warningSound.stop();
        fuelGallon.destroy();
      }
    }
  
    // ####### Sounds #######

    protected configSounds(): void {
      this.warningSound = this.sound.add('warningAudio', {loop: true, volume: .3});
      this.airplaneRefuelingSound = this.sound.add('airplaneAudio', {volume: .2});
      this.playerEngineSound = this.sound.add('engineAudio', {loop: true, volume: .5});
    }

    // ####### Timers #######

    protected timers(): void {
      const AMMO_RELOAD_DELAY: number = 8000;
      const MISSILE_BOX_DELAY = 15000;
      const FUEL_CONSUME_DELAY: number = 5000;
      const AIR_REFUEL_DELAY: number = 25000;
      const ENEMY_SPAWN_DELAY: number = 2000;

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
        delay: FUEL_CONSUME_DELAY,
        callback: this.fuelConsume,
        callbackScope: this,
        loop: true,
      });
      this.time.addEvent({
        delay: AIR_REFUEL_DELAY,
        callback: this.spawnAirRefuelPlane,
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

    // ####### Spawn Events #######

    private spawnAmmoBox(): void {
      const ammoBox = new AmmoBox(this, 'ammoBox');
      this.ammoBoxsGroup.add(ammoBox);
    }

    private spawnMissileBox() {
      const MissileBox = new AmmoBox(this, 'missileBox');
      this.missileBoxGroup.add(MissileBox);
    }

    private spawnAirRefuelPlane(): void {
      const kcPlane = new KC390(this);
      this.supportPlanesGroup.add(kcPlane);
      this.airplaneRefuelingSound.play();
    }

    private spawnFuelGallon(): void {
      const fuelGallon = new FuelGallon(this);
      this.fuelGallonsGroup.add(fuelGallon);
    }

    private spawnEnemy(): void {
      const enemy = new Enemy(this, 'enemy');
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
      localStorage.setItem('spadeCash', (score / 2 + parseInt(playerCash)).toString());
    }

    // REQUIRED IN SCENE METHOD "UPDATE"
    protected playerFuelConsumeUpdate():void {
      if (this.playerFuel == 25) this.warningSound.play();
      if (this.playerFuel == 0) this.gameover();
    }

    private fuelConsume(): void {
      const fuelUse = 5;
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