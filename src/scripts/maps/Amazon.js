import Phaser from 'phaser';
import { Player } from '../gameObjects/player/Player';
import { Enemy } from '../gameObjects/enemy/enemy';

export class Amazon extends Phaser.Scene {
    // ############## Enemy disabled, for tests ############
    constructor() {
        super('amazon');
        this.player = null;
    }

    addPlayer(shootSound) {
        this.trailLayer = this.add.layer();
        this.players = this.add.group();
        this.player = new Player(this, 40, 300, 'player', 150, shootSound);
        this.players.add(this.player);
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
            loop: true
        });
    }

    spawnEnemy() {
        this.enemies.add(new Enemy(this));    
    }

    configSounds() {
        this.shootSound = this.sound.add('shootAudio');
        this.explosionSound = this.sound.add('explosionAudio');
    }

    enemyHit(shoot, enemy) {
        this.add.sprite(enemy.x, enemy.y).play('explosion');
        this.explosionSound.play();
        shoot.destroy();
        enemy.destroy();
    }

    physicsColliders() {
        this.physics.add.collider(this.player.shoots, this.enemies, this.enemyHit, null, this);
    }

    create() {
        this.configSounds();
        this.addPlayer(this.shootSound);
        // this.enemiesGroup();
        // this.physicsColliders();
    }

    update(time, delta) {
        if(this.player) this.player.update(time);
        // this.enemies.children.iterate(function (enemy) {
        //     enemy.update();
        // });
    }
}