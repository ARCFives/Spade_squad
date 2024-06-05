import Phaser from 'phaser';
import { Player } from '../gameObjects/player/Player';

export class Amazon extends Phaser.Scene {
    constructor() {
        super('amazon');
        this.player = null;
    }

    addPlayer() {
        this.trailLayer = this.add.layer();
        this.players = this.add.group();
        this.player = new Player(this, 40, 300, 'player', 150);
        this.players.add(this.player);
    }

    preload() {}

    create() {
        this.addPlayer();
    }

    update(time) {
        if(this.player) this.player.update(time);
    }
}