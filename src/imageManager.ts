import { GAME_IMAGES, IMAGE_PATH, type GameImages } from "./constants"
import { logger } from "./game"
import type { GameImage } from "./types"

export class ImageManager {
    images: GameImage[] = []

    /*
    THIS CANNOT HANDLE THE CASE WHERE THE PROMISE REJECTS FIX !!!!!
    */
    async initialLoad() {
        const start = performance.now()

        await Promise.all(Object.values(GAME_IMAGES).map(val => this.loadImage(val.name)))
        const loadTime = ((performance.now() - start) / 1000).toFixed(3)

        logger.log(`Loaded ${this.images.length} images in ${loadTime}s`, "green")
    }

    loadImage(name: GameImage["name"]) {
        return new Promise((resolve, reject) => {
            const image = new Image()
            image.src = `${IMAGE_PATH}/${name}`
            image.alt = name

            image.onload = () => {
                this.onLoad(image)
                resolve("")
            }
            image.onerror = () => {
                this.onError(image)
                reject("Failed to load")
            }
        })
    }

    onLoad(image: HTMLImageElement) {
        this.images.push(
            {
                name: image.alt,
                image: image
            }
        )
    }

    onError(image: HTMLImageElement) {
        logger.log(`Failed to load image: ${image.alt}`, "red")
    }

    getImage(name: GameImages): GameImage | null {
        const findImage = this.images.find(img => img.name === name)

        if (!findImage) {
            logger.log(`Failed to getImage. requested image: ${name}, images array length: ${this.images.length}`, "red")
            return null
        }

        return findImage
    }
}