import { canvas, context, DEFAULT_VEHICLE_SPEED, DEFAULT_VEHICLE_WIDTH, TILE_HEIGHT } from "./constants"
import type { Point } from "./types"
import { v4 as uuidv4 } from "uuid"
export class Vehicle {
    x: number = 0
    y: number = 0
    width: number = DEFAULT_VEHICLE_WIDTH
    height: number = TILE_HEIGHT / 2
    color: string = "blue"
    id: string = uuidv4()
    intervalController = new AbortController()

    speed: number = DEFAULT_VEHICLE_SPEED
    direction: "left" | "right" = "right"

    setPosition(newPosition: Point) {
        this.x = newPosition.x
        this.y = newPosition.y
    }

    removeInterval() {
        this.intervalController.abort()
    }

    /**
     * @description checks if a vehicle is currently at or pass the edge of the map
     * @returns {boolean} 
     */
    isAtBorder(): boolean {
        if (this.direction === "right") {
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

    draw() {
        context.fillStyle = this.color
        context.fillRect(this.x, this.y, this.width, this.height)
    }
}


export class Truck extends Vehicle { 
    constructor() {
        super()

        this.width = 100,
        this.speed = 0.5
    }
}

export class SportsCar extends Vehicle {
    constructor() {
        super()

        this.width = 25
        this.speed = 10
    }
}