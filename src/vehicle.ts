import { canvas, context, DEFAULT_VEHICLE_SPEED, DEFAULT_VEHICLE_WIDTH, TILE_HEIGHT } from "./constants"
import { Entity } from "./entity"
import type { Point } from "./types"
export class Vehicle extends Entity {
    color: string = "blue"

    constructor() {
        super()
        this.width = DEFAULT_VEHICLE_WIDTH
        this.height = TILE_HEIGHT / 2

        this.setImage("hotdog.png")
    }

    speed: number = DEFAULT_VEHICLE_SPEED
    direction: "left" | "right" = "right"

    setPosition(newPosition: Point) {
        this.x = newPosition.x
        this.y = newPosition.y
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

}


export class Truck extends Vehicle {
    constructor() {
        super()

        this.width = 100,
        this.speed = 0.5

        this.setImage("truck.png")
    }
}

export class SportsCar extends Vehicle {
    constructor() {
        super()

        this.width = 25
        this.speed = 10

        this.setImage("sports_race.png")
    }
}