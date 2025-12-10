import { canvas, context, PLAYER_HEIGHT, PLAYER_WIDTH } from "./constants"
import { game } from "./game"

export class Player {
    x: number = 0
    y: number = 0
    width: number = PLAYER_WIDTH
    height: number = PLAYER_HEIGHT
    color: string = "yellow"

    constructor() {
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
            game.loadNewPart()
        }
    }

    draw() {
        context.fillStyle = this.color
        context.fillRect(this.x, this.y, this.width, this.height)

        // DRAW BORDER
        context.strokeStyle = "black"
        context.lineWidth = 2
        context.strokeRect(this.x, this.y, this.width, this.height)
    }
}