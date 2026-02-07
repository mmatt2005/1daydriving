import { canvas, context, TILE_HEIGHT, TILE_WIDTH } from "../constants"
import { Entity } from "./entity"

export class Tile extends Entity {
    color: string = "blue"

    constructor(x: number, y: number) {
        super()
        this.x = x
        this.y = y
        this.width = TILE_WIDTH
        this.height = TILE_HEIGHT

    }
}