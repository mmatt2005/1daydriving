import { GAME_IMAGES, IMAGE_PATH } from "./constants"
import { logger } from "./game"
import type { GameImage } from "./types"

export class ImageManager {
    images: GameImage[] = []
    loading: boolean = true
    queuedRequestes: (() => void)[] = []

    /*
    THIS CANNOT HANDLE THE CASE WHERE THE PROMISE REJECTS FIX !!!!!
    */
    async initialLoad() {
        const start = performance.now()
        console.log("Starting to load images...")
        await Promise.all(GAME_IMAGES.map(image => this.loadImage(image.name)))
        const loadTime = ((performance.now() - start) / 1000).toFixed(3)

        console.log("All Images loaded!!!")
        logger.log(`Loaded ${this.images.length} images in ${loadTime}s`, "green")

        if (this.queuedRequestes.length > 0) {
            console.log("calling queued requests...")

            this.queuedRequestes.forEach(req => {
                req()
            })
        }
    }

    loadImage(name: GameImage["name"]) {
        return new Promise((resolve, reject) => {
            const image = new Image()
            image.src = `${IMAGE_PATH}/${name}`
            image.alt = name
            console.log("Loading: " + name)

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

    getImage(name: GameImage["name"]): Promise<GameImage> {
        if (this.loading) {
            return new Promise(resolve => {
                this.queuedRequestes.push(() => {
                    resolve(this.getImageSync(name))
                })
            })
        }

        return Promise.resolve(this.getImageSync(name))
    }

    private getImageSync(name: GameImage["name"]): GameImage {
        const img = this.images.find(img => img.name === name)
        if (!img) throw new Error(`Image not found: ${name}`)
        return img
    }

}