import Phaser from 'phaser';

export class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, name, speed) {
        super(scene, x, y, name);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.name = name;
        this.speed = speed;
        this.lastFired = 0;
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
        this.SPACE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    init() {
        this.anims.create({
            key: this.name + 'fly',
            frames: this.anims.generateFrameNumbers('player', { frames: [0, 1] }),
            frameRate: 10,
            repeat: -1
          });
          this.anims.create({
            key: this.name + 'shoot',
            frames: this.anims.generateFrameNumbers('player', { frames: [2, 3, 4] }),
            frameRate: 60
          });
          this.anims.play(this.name + 'fly');
    }

    cannonShoot(time) {
        if(this.SPACE.isDown && time > this.lastFired) {
            const bullet = this.shoots.create(this.x, this.y, 'shoot');
            bullet.setVelocityX(+200);
            this.lastFired = time + 200;
        }}

    movementVertical() {
        if(this.S.isDown || this.cursor.down.isDown) {
            this.body.setVelocityY(+this.speed);
        }else if (this.cursor.up.isDown || this.W.isDown) {
            this.body.setVelocityY(-this.speed);
        }else {
            this.body.setVelocityY(0);
        }
    }

    movementHorizontal() {
        if(this.A.isDown || this.cursor.left.isDown) {
            this.body.setVelocityX(-this.speed);
       }else if(this.D.isDown || this.cursor.right.isDown) {
            this.body.setVelocityX(+this.speed);
       }else { 
           this.body.setVelocityX(0);
       }
    }

    update(time) {
        this.movementVertical();
        this.movementHorizontal();
        this.cannonShoot(time);
        this.shoots.children.each(function(shoot) {
            if (shoot.x < 0 || shoot.x > this.scene.game.config.width) {
                shoot.destroy();
            }
        }, this);
    }

}
