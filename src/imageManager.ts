import { IMAGE_PATH, } from "./constants"
import { logger } from "./game"
import type { GameImage } from "./types"

export class ImageManager {
    images: GameImage[] = []

    /*
    THIS CANNOT HANDLE THE CASE WHERE THE PROMISE REJECTS FIX !!!!!
    */
    async initialLoad() {
        const start = performance.now()

        await Promise.all(Object.values(["tilesheet_64x64.png"]).map(val => this.loadTileSheet(val)))
        const loadTime = ((performance.now() - start) / 1000).toFixed(3)

        logger.log(`Loaded ${this.images.length} images in ${loadTime}s`, "green")
    }

    loadTileSheet(tileSheet: string) {
        return new Promise((resolve, reject) => {
            const image = new Image()
            image.src = `${IMAGE_PATH}/${tileSheet}`
            image.alt = tileSheet

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

    getTileSheet(): GameImage | null {
        const findImage = this.images.find(img => img.name === "tilesheet_64x64.png")

        if (!findImage) {
            logger.log(`Failed to getImage. requested image: tilesheet_64x64.png, images array length: ${this.images.length}`, "red")
            return null
        }

        return findImage
    }
}