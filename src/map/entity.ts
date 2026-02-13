import { v4 as uuidv4 } from "uuid";
import { type Asset, ASSETS, context, TILE_WIDTH, TILE_HEIGHT } from "../constants";
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
    drawCollisionBox?: boolean
}

export class Entity {
    tileAtlasCoord: Asset = ASSETS.DEV
    x: number = 0
    y: number = 0
    id: string = uuidv4()
    color: string = "blue"

    setColor(newColor: string) {
        this.color = newColor
    }

    setPosition(point: Point) {
        this.x = point.x
        this.y = point.y
    }


    getEntityAssetDimensions(): { width: number, height: number } {
        const assetTilesheet = this.tileAtlasCoord.tilesheet

        if (assetTilesheet === "tilesheet16.png") {
            return { width: 16, height: 16 }
        } else if (assetTilesheet === "tilesheet_64x64.png") {
            return { width: 64, height: 64 }
        } else {
            console.log("Failed to getEntityAssetDimensions...")
            return { width: 0, height: 0 }
        }
    }

    getWidth(): number {
        const dimensions = this.getEntityAssetDimensions()

        return dimensions.width
    }

    getHeight(): number {
        const dimensions = this.getEntityAssetDimensions()

        return dimensions.height
    }

    draw(options?: EntityDrawProperties) {
        const { width, height } = this.getEntityAssetDimensions()


        context.drawImage(
            imageManager.getTileSheet()!.image,
            this.tileAtlasCoord.x * width, this.tileAtlasCoord.y * height, width, height, // Crop from the tilesheet
            this.x, this.y, width, height // Draw to the canvas

        )

        if (options?.drawBorder) {
            context.strokeStyle = options.borderColor || "black"
            context.lineWidth = 2
            context.strokeRect(this.x, this.y, width, height)
        }

        if (options?.drawCoordinates) {
            // Draw the (x, y) of the entity
            context.font = "10px arial"
            context.fillStyle = options.drawCoordinatesColor ? options.drawCoordinatesColor : "red"
            context.fillText(`(${this.x}, ${this.y})`, this.x + 5, this.y + height - 10)
        }

        if (options?.drawCollisionBox && this.tileAtlasCoord.collisions) {
            context.strokeStyle = options.borderColor || "black"
            context.lineWidth = 2
            context.strokeRect(this.x, this.y, width, height)
        }
    }

}