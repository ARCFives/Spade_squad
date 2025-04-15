export interface ILanguages {
    portugues: {
        mainmenu: {
            iniciar: {
                x: number
                y: number
                text: string
            }
            loja: {
                x: number
                y: number
                text: string
            }
            controles: {
                x: number
                y: number
                text: string
            }
            creditos: {
                x: number
                y: number
                text: string
            }
        }
        controls: {
            mainText: string
            moveUp: string,
            moveDown: string,
            moveRight: string,
            moveLeft: string,
            pause: string,
            playerShoot: string
            playerMissile: string
            callRefuelling: string
        }
        store: {
            engineIDescription: string
            engineIIDescription: string
            gunIDescription: string
            missileIDescription: string
            missileIIDescription: string
            refuellingDescription: string
        }
        pauseGame: {
            resume: string
            mainMenu: string
        }
        gameover: {
            reset: string
            mainmenu: string
        }
    }
    english: {
        mainmenu: {
            iniciar: {
                x: number
                y: number
                text: string
            }
            loja: {
                x: number
                y: number
                text: string
            }
            controles: {
                x: number
                y: number
                text: string
            }
            creditos: {
                x: number
                y: number
                text: string
            }
        }
        controls: {
            mainText: string
            moveUp: string,
            moveDown: string,
            moveRight: string,
            moveLeft: string,
            pause: string,
            playerShoot: string
            playerMissile: string
            callRefuelling: string
        }
        store: {
            engineIDescription: string
            engineIIDescription: string
            gunIDescription: string
            missileIDescription: string
            missileIIDescription: string
            refuellingDescription: string
        }
        pauseGame: {
            resume: string
            mainMenu: string
        }
        gameover: {
            reset: string
            mainmenu: string
        }
    }
}