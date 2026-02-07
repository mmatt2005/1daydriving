import { canvas, context, NUM_OF_COLS, NUM_OF_ROWS, TILE_HEIGHT, TILE_WIDTH } from './constants'
import { CommandHandler } from './handlers/commandHandler'
import { EventHandler } from './handlers/eventHandler'
import { Logger } from './logger'
import { Player } from './player'
import './style.css'
import { Tile } from './map/tile'
import { ImageManager } from './imageManager'
import { MapManager } from './map/mapManager'

export const logger = new Logger()
export const imageManager = new ImageManager()
await imageManager.initialLoad()

export const eventHandler = new EventHandler()
export const commandHandler = new CommandHandler()
export const mapManager = new MapManager()
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

        const { x: centerX, y: centerY } = mapManager.centerOfMap()
        this.translateX = centerX
        this.translateY = centerY

        this.draw()
        this.update()
    }

    draw() {
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.save()
        context.translate(-this.translateX, -this.translateY)

        // Draw the map
        mapManager.tiles.flat().forEach(t => t.draw({ drawBorder: true, drawCoordinates: true }))
        mapManager.mapEntities.forEach(entity => entity.draw())

        // Draw the player
        player.draw({ drawCoordinates: true, drawCoordinatesColor: "black", drawBorder: true, borderColor: "red" })

        context.restore()

        window.requestAnimationFrame(() => this.draw())
    }

    update() {
        // Draw the command handler "COMMAND" ui 
        commandHandler.draw()

        // Draw the logger text
        logger.draw()

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