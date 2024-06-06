import Phaser from 'phaser';
import { Player } from '../gameObjects/player/Player';

export class Amazon extends Phaser.Scene {
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

    preload() {}

    create() {
        this.shootSound = this.sound.add('shootAudio');
        this.addPlayer(this.shootSound);
    }

    update(time) {
        if(this.player) this.player.update(time);
    }
}