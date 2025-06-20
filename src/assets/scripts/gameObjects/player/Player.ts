import { IPlanesConfig } from 'assets/interfaces/IPlanesConfig';
import { IPlayerControls } from 'assets/interfaces/IPlayerControls';
import { BaseScene } from 'assets/scripts/scenes/base/Base_Scene';
import { GameObjects, Input, Math, Physics } from 'phaser';

export class Player extends GameObjects.Container {
  declare body: Phaser.Physics.Arcade.Body; // Declare the body property to be of type Body
  declare scene: BaseScene; // Declare the scene property to be of type Base scene
  public ammoCount: number;
  public missileCount: number;
  private hasAirfuelling: number;
  public shoots: Physics.Arcade.Group;
  public missiles: Physics.Arcade.Group;
  protected currentLevelPlayer!: string;
  private speed: number;
  private playerSprite: Phaser.GameObjects.Sprite;
  private muzzleFlash: Phaser.GameObjects.Sprite;
  private wingMissile: Phaser.GameObjects.Sprite;
  private lastFired: number = 0;
  private keys!: IPlayerControls;
  private configPlane: IPlanesConfig;

  constructor(scene: BaseScene, x: number, y: number, plane_id: string) {
    super(scene, x, y);
    this.name = plane_id;

    this.configPlane = scene.playerPlane(plane_id);
    this.speed = scene.checkEngineLvIIUpgrade();
    this.ammoCount = scene.checkMainGunUpgrade();
    this.missileCount = scene.checkMissileUpgrade();
    this.hasAirfuelling = scene.checkRefuelUpgrade();

    this.playerSprite = scene.add.sprite(0, 0, plane_id).setOrigin(0.5);
    this.playerSprite.anims.play(this.configPlane.fly_animation);

    this.muzzleFlash = scene.add
      .sprite(
        this.configPlane.muzzleFlash_X,
        this.configPlane.muzzleFlash_Y,
        'muzzle_flash'
      )
      .setOrigin(0.5);
    this.muzzleFlash.setVisible(false);

    this.wingMissile = scene.add
      .sprite(
        this.configPlane.misssileAttached_X,
        this.configPlane.misssileAttached_Y,
        'wing_missile'
      )
      .setOrigin(0.5);

    this.setSize(
      this.playerSprite.displayWidth,
      this.playerSprite.displayHeight
    );

    this.add(this.playerSprite);
    this.add(this.muzzleFlash);
    this.add(this.wingMissile);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(true);

    this.shoots = scene.physics.add.group();
    this.missiles = scene.physics.add.group();

    this.setControls();
  }

  // ####### Controls #######

  private setControls() {
    this.keys = {
      up: this.scene.input.keyboard!.addKey(Input.Keyboard.KeyCodes.UP),
      down: this.scene.input.keyboard!.addKey(Input.Keyboard.KeyCodes.DOWN),
      left: this.scene.input.keyboard!.addKey(Input.Keyboard.KeyCodes.LEFT),
      right: this.scene.input.keyboard!.addKey(Input.Keyboard.KeyCodes.RIGHT),
      shoot: this.scene.input.keyboard!.addKey(Input.Keyboard.KeyCodes.SPACE),
      missileShoot: this.scene.input.keyboard!.addKey(
        Input.Keyboard.KeyCodes.SHIFT
      ),
      airRefueling: this.scene.input.keyboard!.addKey(
        Input.Keyboard.KeyCodes.X
      ),
      pause: this.scene.input.keyboard!.addKey(Input.Keyboard.KeyCodes.ESC),
      W: this.scene.input.keyboard!.addKey(Input.Keyboard.KeyCodes.W),
      S: this.scene.input.keyboard!.addKey(Input.Keyboard.KeyCodes.S),
      D: this.scene.input.keyboard!.addKey(Input.Keyboard.KeyCodes.D),
      A: this.scene.input.keyboard!.addKey(Input.Keyboard.KeyCodes.A),
    };
  }

  private callAirfueling(time: number) {
    if (this.keys.airRefueling.isDown && time > this.lastFired) {
      if (this.hasAirfuelling == 1) {
        this.scene.spawnAirRefuelPlane();
        this.hasAirfuelling -= 1;
      }
    }
  }

  private movement() {
    if (this.keys.down.isDown || this.keys.S.isDown) {
      this.body.setVelocityY(+this.speed);
    } else if (this.keys.up.isDown || this.keys.W.isDown) {
      this.body.setVelocityY(-this.speed);
    } else {
      this.body.setVelocityY(0);
    }
    if (this.keys.left.isDown || this.keys.A.isDown) {
      this.body.setVelocityX(-(this.speed - 30));
    } else if (this.keys.right.isDown || this.keys.D.isDown) {
      this.body.setVelocityX(+this.speed);
    } else {
      this.body.setVelocityX(0);
    }
  }

  private mainGun(time: number) {
    if (this.keys.shoot.isDown && time > this.lastFired && this.ammoCount > 0) {
      const shoot = this.shoots.create(
        this.x + this.configPlane.main_gun_fire_X,
        this.y,
        'shoot'
      );
      this.muzzleFlash
        .setVisible(true)
        .play('muzzle_flash')
        .once('animationcomplete', () => {
          this.muzzleFlash.setVisible(false);
        });
      shoot.setVelocityX(+200);
      this.lastFired = time + 200;
      this.ammoCount--;
      this.scene.sound.play('shootAudio');
      this.scene.events.emit('playerMainGun', this.ammoCount);
    }
    if (this.keys.shoot.isDown && time > this.lastFired && this.ammoCount === 0)
      this.scene.sound.play('emptyAudio');
  }

  private missilesFire(time: number) {
    if (
      this.keys.missileShoot.isDown &&
      time > this.lastFired &&
      this.missileCount > 0
    ) {
      const nearestEnemy = this.findEnemy();
      if (nearestEnemy) {
        const missile = this.missiles
          .create(this.x, this.y + 14, 'missile')
          .play('missileFire');
        this.scene.sound.play('missileAudio');
        missile.target = nearestEnemy;
        this.missileCount -= 1;
        this.lastFired = time + 200;
        this.scene.events.emit('playerFireMissile', this.missileCount);
      }
    }
    if (
      this.keys.missileShoot.isDown &&
      time > this.lastFired &&
      this.missileCount == 0
    ) {
      this.scene.sound.play('emptyAudio');
    }
  }

  private pauseGame() {
    if (this.keys.pause.isDown) {
      this.scene.input.stopPropagation();
      this.scene.scene.pause();
      this.scene.scene.launch('pausemenu');
    }
  }

  // ####### Missile System #######

  private findEnemy() {
    this.currentLevelPlayer = this.scene.registry.get('sceneName');
    const map = this.scene.scene.get(this.currentLevelPlayer) as BaseScene;
    const enemies = map.enemiesGroup.getChildren();
    let nearestEnemy = null;
    let minDistance = Infinity;
    enemies.forEach((enemy: GameObjects.GameObject) => {
      if (enemy instanceof GameObjects.Sprite) {
        const distance = Phaser.Math.Distance.Between(
          this.x,
          this.y,
          enemy.x,
          enemy.y
        );
        if (distance < minDistance) {
          nearestEnemy = enemy;
          minDistance = distance;
        }
      }
    });
    return nearestEnemy;
  }

  private updateMissileDirection() {
    this.missiles.children.each((missileSprite: GameObjects.GameObject) => {
      const missile = missileSprite as Phaser.GameObjects.Sprite & {
        target?: Phaser.GameObjects.Sprite;
      };
      if (missile.target && missile.target.active) {
        this.scene.physics.moveToObject(missile, missile.target, 200);
        const angle = Math.Angle.Between(
          missile.x,
          missile.y,
          missile.target.x,
          missile.target.y
        );
        missile.setRotation(angle);
      }
      return null;
    }, this);
  }

  // ####### Others #######

  private removeWeaponsOffScreen() {
    this.shoots.children.each((shoot: GameObjects.GameObject) => {
      if (shoot instanceof GameObjects.Sprite) {
        if (shoot.x < 0 || shoot.x > 800) {
          shoot.destroy();
        }
      }
      return null;
    }, this);

    this.missiles.children.each((missile: GameObjects.GameObject) => {
      if (missile instanceof GameObjects.Sprite) {
        if (
          missile.y < 0 ||
          missile.y > 600 ||
          missile.x < 0 ||
          missile.x > 800
        ) {
          missile.destroy();
        }
      }
      return null;
    }, this);
  }

  private updateAttached() {
    if (this.missileCount > 0) {
      this.wingMissile.setVisible(true);
    } else {
      this.wingMissile.setVisible(false);
    }
  }

  // ####### Phaser base #######

  update(time: number) {
    this.movement();
    this.mainGun(time);
    this.pauseGame();
    this.removeWeaponsOffScreen();
    this.callAirfueling(time);
    this.missilesFire(time);
    this.updateMissileDirection();
    this.updateAttached();
  }
}
