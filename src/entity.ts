import { context } from "./constants";
import { imageManager, logger } from "./game";
import type { GameImage } from "./types";
import {v4 as uuidv4} from "uuid"

export class Entity {
    image: GameImage | null = null
    x: number = 0
    y: number = 0
    width: number = 0
    height: number = 0
    id: string = uuidv4()

    setImage(name: GameImage["name"]) {
        const img = imageManager.getImage(name)
        if (!img) return logger.log(`failed to set image: ${name} for entity`)

        this.image = img

        console.log("being called?")
    }

    draw() {
        if (this.image) {
            context.drawImage(this.image.image, this.x, this.y, this.width, this.height)
        } else { 
            context.fillStyle = "yellow"
        }
    }

}