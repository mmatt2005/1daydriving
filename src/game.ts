import { canvas, NUM_OF_COLS, NUM_OF_ROWS, TILE_HEIGHT, TILE_WIDTH } from './constants'
import { getRoadTopLane, isNumOfRowsEven } from './helpers'
import { Player } from './player'
import './style.css'
import { Tile } from './tile'
import { VehicleManager } from './vehicleManager'

export class Game {
    tiles: Tile[][] = []
    player: Player
    vehicleManager: VehicleManager = new VehicleManager()

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
    }

    loadNewPart() {
        const biomes: Tile["type"][] = ["desert", "forest", "tundra"]
        const newBiome = biomes[Math.floor(Math.random() * biomes.length)]

        this.tiles.flat().forEach(tile => {
            if (!tile.isTile("road")) {
                tile.setType(newBiome)
            }
        })


        console.log("Loading new part of the map...")
    }

    draw() {
        // Draw the tiles
        this.tiles.flat().forEach(t => t.draw())

        // Draw the player
        this.player.draw()

        // Draw the vehicles
        this.vehicleManager.draw()

        window.requestAnimationFrame(() => this.draw())
    }

}


export const game = new Game()