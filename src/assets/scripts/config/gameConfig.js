import { Amazon } from '../maps/Amazon';
import { Preload } from '../menus/Preload';

export const gameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    pixelArt: true,
    title: 'Spade Squad',
    version: '1.0.0',
    physics: {
        default: 'arcade',
        arcade : {debug: true}
            },
    autoFocus: true,
    scene: [Preload, Amazon]
};