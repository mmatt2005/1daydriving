import { context, GAME_IMAGES, type GameImages } from "./constants";
import { imageManager, logger } from "./game";
import type { GameImage, Point } from "./types";
import { v4 as uuidv4 } from "uuid"


/**
 * @description when drawing a entity you can use these properties to help debug drawing
 * @interface EntityDrawProperties
 * @typedef {EntityDrawProperties}
 */
interface EntityDrawProperties { 
    drawBorder?: boolean
    borderColor?: string
}

export class Entity {
    image: GameImage | null = null
    x: number = 0
    y: number = 0
    width: number = 0
    height: number = 0
    id: string = uuidv4()

    setImage(name: GameImages) {
        const img = imageManager.getImage(name)
        if (!img) return logger.log(`failed to set image: ${name} for entity`)

        this.image = img
    }

    setPosition(point: Point) { 
        this.x = point.x
        this.y = point.y
    }

    draw(options?: EntityDrawProperties) {
        if (this.image) {
            context.drawImage(this.image.image, this.x, this.y, this.width, this.height)
        } else {
            context.fillStyle = "yellow"
            context.fillRect(this.x, this.y, this.width, this.height)
        }

        if (options?.drawBorder) {
            context.strokeStyle = options.borderColor || "black"
            context.lineWidth = 2
            context.strokeRect(this.x, this.y, this.width, this.height)
        }
    }

}