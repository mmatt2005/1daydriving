import { v4 as uuidv4 } from "uuid";
import { type TileAtlasCoord, TILE_ATLAS_COORDS, context, TILE_WIDTH, TILE_HEIGHT } from "../constants";
import { imageManager } from "../game";
import type { Point } from "../types";


/**
 * @description when drawing a entity you can use these properties to help debug drawing
 * @interface EntityDrawProperties
 * @typedef {EntityDrawProperties}
 */
interface EntityDrawProperties {
    drawBorder?: boolean
    borderColor?: string
    fillColor?: string
    drawCoordinates?: boolean
    drawCoordinatesColor?: string
}

export class Entity {
    tileAtlasCoord: TileAtlasCoord = TILE_ATLAS_COORDS.DEV
    x: number = 0
    y: number = 0
    width: number = 0
    height: number = 0
    id: string = uuidv4()
    color: string = "blue"

    setColor(newColor: string) {
        this.color = newColor
    }

    setPosition(point: Point) {
        this.x = point.x
        this.y = point.y
    }

    draw(options?: EntityDrawProperties) {
        context.drawImage(
            imageManager.getTileSheet()!.image,
            this.tileAtlasCoord.x * TILE_WIDTH, this.tileAtlasCoord.y * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT, // Crop from the tilesheet
            this.x, this.y, TILE_WIDTH, TILE_HEIGHT // Draw to the canvas

        )

        if (options?.drawBorder) {
            context.strokeStyle = options.borderColor || "black"
            context.lineWidth = 2
            context.strokeRect(this.x, this.y, this.width, this.height)
        }

        if (options?.drawCoordinates) {
            // Draw the (x, y) of the entity
            context.font = "10px arial"
            context.fillStyle = options.drawCoordinatesColor ? options.drawCoordinatesColor : "red"
            context.fillText(`(${this.x}, ${this.y})`, this.x + 5, this.y + this.height - 10)
        }
    }

}