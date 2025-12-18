import { canvas, PLAYER_HEIGHT, PLAYER_WIDTH } from "./constants"
import { Entity } from "./entity"
import { game } from "./game"

export class Player extends Entity {
    color: string = "yellow"

    constructor() {
        super()
        this.width = PLAYER_WIDTH
        this.height = PLAYER_HEIGHT
        
        this.setImage("hotdog.png")

        document.addEventListener("keydown", event => {
            switch (event.key) {
                case "a":
                    this.moveLeft()
                    break
                case "d":
                    this.moveRight()
                    break
                case "ArrowLeft":
                    this.moveLeft()
                    break
                case "ArrowRight":
                    this.moveRight()
                    break
            }
        })
    }

    moveLeft() {
        this.setPosition({ x: this.x - 10, y: this.y })
    }

    moveRight() {
        this.setPosition({ x: this.x + 10, y: this.y })
    }

    setPosition(newPosition: { x: number, y: number }) {
        this.x = newPosition.x
        this.y = newPosition.y

        // Check if the player is at the futherest left part of the map. If true load a new part of the map and reset the player all the way to the right
        if (this.x <= 0) {
            this.x = canvas.width - PLAYER_WIDTH
            game.mapManager.loadNewBiome()
        }
    }
}