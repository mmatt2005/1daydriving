import { canvas, context, DEFAULT_VEHICLE_SPEED, TILE_HEIGHT } from "./constants"
import type { Point } from "./types"
import { v4 as uuidv4 } from "uuid"
export class Vehicle {
    x: number = 0
    y: number = 0
    width: number = 50
    height: number = TILE_HEIGHT / 2
    color: string = "blue"
    id: string = uuidv4()
    intervalController = new AbortController()

    speed: number = DEFAULT_VEHICLE_SPEED

    setPosition(newPosition: Point) {
        this.x = newPosition.x
        this.y = newPosition.y
    }

    moveLeft() {

    }

    moveRight() {
        const signal = this.intervalController.signal

        const interval = setInterval(() => {
            this.setPosition({ x: this.x + this.speed, y: this.y })
            this.onMove()

            if (signal.aborted) { 
                console.log("the interval was aborted!")
                clearInterval(interval)
                return
            }
        }, 500)

    }

    removeInterval() {
        this.intervalController.abort()
    }

    /**
     * @description checks if a vehicle is currently at or pass the edge of the map
     * @param {("left" | "right")} [direction="right"] The direction the car is going (left or right) defaults to right
     * @returns {boolean} 
     */
    isAtBorder(direction: "left" | "right" = "right"): boolean {
        if (direction === "right") {
            if (this.x + (this.width / 2) >= canvas.width) {
                return true
            }
        } else {
            if (this.x <= 0) {
                return true
            }
        }

        return false
    }

    onMove() {
    }

    draw() {
        context.fillStyle = this.color
        context.fillRect(this.x, this.y, this.width, this.height)
    }
}