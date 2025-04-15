import { ILanguages } from 'assets/interfaces/ILanguages';

export const language: ILanguages = {
    portugues: {
        mainmenu: {
            iniciar: {
                x: 325,
                y: 260,
                text: 'Iniciar'
            },
            loja: {
                x: 340,
                y: 320,
                text: 'Loja'
            },
            controles: {
                x: 290,
                y: 380,
                text: 'Controles'
            },
            creditos: {
                x: 300,
                y: 440,
                text: 'Créditos'
            }
        },
        controls: {
            mainText: 'Controles',
            moveDown: 'Mover para baixo',
            moveUp: 'Mover para cima',
            moveLeft: 'Mover para esquerda',
            moveRight: 'Mover para direita',
            pause: 'Pause',
            playerShoot: 'Disparar arma',
            playerMissile: 'Disparar míssil',
            callRefuelling: 'Solicitar Abastecimento'
        },
        store: {
            engineIDescription: 'Economiza 50% de combustível.',
            engineIIDescription: 'Aumenta a velocidade em 20%.',
            gunIDescription: 'Inicia com o dobro de munição na arma principal.',
            missileIDescription: 'Começa com mais 1 míssil nos pods.',
            missileIIDescription: 'Começa com mais 2 mísseis nos pods.',
            refuellingDescription: 'Pode pedir um avião de abastecimento apertando X.'
        },
        pauseGame: {
            resume: 'CONTINUAR',
            mainMenu: 'MENU PRINCIPAL'
        },
        gameover: {
            reset: 'Tecle R para reset',
            mainmenu: 'MENU PRINCIPAL'
        }
    },
    english: {
        mainmenu: {
            iniciar: {
                x: 320,
                y: 260,
                text: 'Start'
            },
            loja: {
                x: 320,
                y: 320,
                text: 'Store'
            },
            controles: {
                x: 290,
                y: 380,
                text: 'Controls'
            },
            creditos: {
                x: 300,
                y: 440,
                text: 'Credits'
            }
        },
        controls: {
            mainText: 'Controls',
            moveDown: 'Move Down',
            moveUp: 'Mover Up',
            moveLeft: 'Mover Left',
            moveRight: 'Mover Right',
            pause: 'Pause',
            playerShoot: 'Player Main Gun',
            playerMissile: 'Player Fire Missile',
            callRefuelling: 'Aerial Refueling'
        },
        store: {
            engineIDescription: 'Saves 50% fuel.',
            engineIIDescription: 'Increases speed by 20%.',
            gunIDescription: 'Starts with double the ammo in the main gun.',
            missileIDescription: 'Starts with 1 extra missile in the pods.',
            missileIIDescription: 'Starts with 2 extra missiles in the pods.',
            refuellingDescription: 'Can call a refueling plane by pressing X.'
        },
        pauseGame: {
            resume: 'RESUME',
            mainMenu: 'MAIN MENU'
        },
        gameover: {
            reset: 'Press R to reset',
            mainmenu: 'MAIN MENU'
        }
    }
};