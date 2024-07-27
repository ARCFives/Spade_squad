import Phaser from 'phaser';
export class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name, speed, shootSound) {
    super(scene, x, y, name);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.name = name;
    this.speed = speed;
    this.lastFired = 0;
    this.ammunitionCount = 25;
    this.shootSound = shootSound;
    this.setOrigin(1, 0.5);
    this.body.setCollideWorldBounds(true);
    this.shoots = scene.physics.add.group();
    this.setControls();
    this.init();
  }

  setControls() {
    this.cursor = this.scene.input.keyboard.createCursorKeys();
    this.W = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.S = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.D = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.A = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.SPACE = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.BACKSPACE = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.BACKSPACE
    );
  }

  init() {
    this.anims.play('playerFly');
  }

  cannonShoot(time) {
    if (
      this.SPACE.isDown &&
      time > this.lastFired &&
      this.ammunitionCount > 0
    ) {
      const bullet = this.shoots.create(this.x, this.y, 'shoot');
      if (bullet) {
        this.play('playerShoot').once('animationcomplete', () => {
          this.play('playerFly');
        });
      }
      bullet.setVelocityX(+200);
      this.ammunitionCount -= 1;
      this.lastFired = time + 200;
      this.shootSound.play();
      this.scene.events.emit('playerShoot', this.ammunitionCount);
    }
  }

  movementVertical() {
    if (this.S.isDown || this.cursor.down.isDown) {
      this.body.setVelocityY(+this.speed);
    } else if (this.cursor.up.isDown || this.W.isDown) {
      this.body.setVelocityY(-this.speed);
    } else {
      this.body.setVelocityY(0);
    }
  }

  movementHorizontal() {
    if (this.A.isDown || this.cursor.left.isDown) {
      this.body.setVelocityX(-this.speed);
    } else if (this.D.isDown || this.cursor.right.isDown) {
      this.body.setVelocityX(+this.speed);
    } else {
      this.body.setVelocityX(0);
    }
  }

  pauseGame() {
    if (this.BACKSPACE.isDown) {
      this.scene.input.stopPropagation();
      this.scene.scene.pause();
      this.scene.scene.launch('pausemenu');
    }
  }

  removeBulletsScreen() {
    this.shoots.children.each(function (shoot) {
      if (shoot.x < 0 || shoot.x > this.scene.game.config.width) {
        shoot.destroy();
      }
    }, this);
  }

  update(time) {
    this.movementVertical();
    this.movementHorizontal();
    this.cannonShoot(time);
    this.pauseGame();
    this.removeBulletsScreen();
  }
}
