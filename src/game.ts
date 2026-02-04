import { CommandHandler } from './commandHandler'
import { canvas, context, NUM_OF_COLS, NUM_OF_ROWS, TILE_HEIGHT, TILE_WIDTH } from './constants'
import { EventHandler } from './eventHandler'
import { ImageManager } from './imageManager'
import { Logger } from './logger'
import { NewMapManager } from './new_mapManager'
import { Player } from './player'
import './style.css'
import { Tile } from './tile'

export const logger = new Logger()
export const imageManager = new ImageManager()
await imageManager.initialLoad()

export const eventHandler = new EventHandler()
export const commandHandler = new CommandHandler()

export const newMapManager = new NewMapManager()

export const player = new Player()


export class Game {
    tiles: Tile[][] = []
    frame: number = 0
    translateX: number = 0
    translateY: number = 0

    constructor() {
        // Create the base tiles
        for (let col = 0; col < NUM_OF_COLS; col++) {
            this.tiles.push([])
            for (let row = 0; row < NUM_OF_ROWS; row++) {
                const tile = new Tile(col * TILE_WIDTH, row * TILE_HEIGHT)
                this.tiles[col].push(tile)
            }
        }

        const { x: centerX, y: centerY } = newMapManager.centerOfMap()
        this.translateX = centerX
        this.translateY = centerY

        this.draw()
        this.update()
    }

    draw() {
        context.clearRect(0, 0, canvas.width, canvas.height)

        context.save()

        context.translate(-this.translateX, -this.translateY)

        newMapManager.tiles.flat().forEach(t => t.draw({ drawBorder: true, drawCoordinates: true }))
        newMapManager.mapEntities.forEach(entity => entity.draw())

        // Draw the player
        player.draw({ drawCoordinates: true, drawCoordinatesColor: "black", drawBorder: true, borderColor: "red" })

        // Draw the command handler "COMMAND" ui 
        commandHandler.draw()

        // Draw the logger text
        logger.draw()

        context.restore()

        window.requestAnimationFrame(() => this.draw())
    }

    update() {
        if (this.frame >= 120) {
            this.frame = 0
        }

        this.frame++

        if (this.frame >= 120) {
            if (logger.logs.length > 0) {
                logger.removeOldestLog()
            }
        }

        window.requestAnimationFrame(() => this.update())
    }
}

export const game = new Game()