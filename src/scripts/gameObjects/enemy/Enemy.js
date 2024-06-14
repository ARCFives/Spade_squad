import Phaser from 'phaser';

export class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene,790, Math.random() * (580 - 40) + 40 , 'enemy');
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.speed = Phaser.Math.Between(50, 120);
        this.play('enemyFly');
    }

    update(time, delta) {
        this.body.setVelocityX(-this.speed);
        if(this.x < 0) {
            this.destroy();
        }
    }
}