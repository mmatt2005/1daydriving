import { CommandHandler } from './commandHandler'
import { canvas, NUM_OF_COLS, NUM_OF_ROWS, TILE_HEIGHT, TILE_WIDTH } from './constants'
import { EventHandler } from './eventHandler'
import { getRoadTopLane, isNumOfRowsEven } from './helpers'
import { Logger } from './logger'
import { Player } from './player'
import './style.css'
import { Tile } from './tile'
import { VehicleManager } from './vehicleManager'

export const eventHandler = new EventHandler()
export const commandHandler = new CommandHandler()
export const logger = new Logger()

export class Game {
    tiles: Tile[][] = []
    player: Player
    vehicleManager: VehicleManager = new VehicleManager()
    frame: number = 0

    constructor() {
        // Create the base tiles
        for (let col = 0; col < NUM_OF_COLS; col++) {
            this.tiles.push([])
            for (let row = 0; row < NUM_OF_ROWS; row++) {
                const tile = new Tile(col * TILE_WIDTH, row * TILE_HEIGHT)
                this.tiles[col].push(tile)
            }
        }

        const player = new Player()
        this.player = player

        if (isNumOfRowsEven()) {
            // Create the road tiles
            this.tiles.forEach(col => {
                col.forEach((tile, index) => {
                    if (index === (NUM_OF_ROWS / 2)) {
                        tile.setType("road")
                    }
                })
            })

            // Set the players default position the the middle row all the way to the right
            player.setPosition(
                {
                    x: canvas.width - player.width,
                    y: getRoadTopLane(this.tiles).y
                }
            )
        }

        this.draw()
        this.update()
    }

    loadNewPart() {
        const biomes: Tile["type"][] = ["desert", "forest", "tundra"]
        const newBiome = biomes[Math.floor(Math.random() * biomes.length)]

        this.vehicleManager.despawnAllVehicles()

        this.tiles.flat().forEach(tile => {
            if (!tile.isTile("road")) {
                tile.setType(newBiome)
            }
        })

        logger.log("Loading new part of the map...")
    }

    draw() {
        // Draw the tiles
        this.tiles.flat().forEach(t => t.draw())

        // Draw the player
        this.player.draw()

        // Draw the vehicles
        this.vehicleManager.draw()

        // Draw the command handler "COMMAND" ui 
        commandHandler.draw()

        // Draw the logger text
        logger.draw()

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

        this.vehicleManager.moveVehicles()

        window.requestAnimationFrame(() => this.update())
    }
}

export const game = new Game()