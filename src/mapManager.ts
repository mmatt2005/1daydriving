import { BIOMES, GAME_IMAGES, NUM_OF_ROWS, type Biomes, type GameImages } from "./constants"
import { Game, game, logger } from "./game"
import type { Tile } from "./tile"
import type { GameImage } from "./types"

export class MapManager {
    currentBiome: Biomes = "forest"

    // constructor() {
    //     this.currentBiome = this.selectNewBiome()
    // }

    createMap(tiles: Game["tiles"]) {
        console.log("Creating the default map...")

        const availableTiles = this.availableGroundTilesForBiome()

        tiles.forEach(col => {
            col.forEach((tile, index) => {
                if (index === (NUM_OF_ROWS / 2)) {
                    tile.setImage("road.png")
                } else {
                    tile.setImage(this.selectRandomImage(availableTiles))

                    const shouldAddDecoration = Math.random()

                    if (shouldAddDecoration >= 0.50) {
                        tile.setImage(this.selectRandomImage(this.availableDecoration()))
                    }

                }
            })
        })

    }

    availableDecoration(): GameImages[] {
        return Object.values(GAME_IMAGES).filter(obj => 
            obj.isDecoration
        ).map(obj => obj.name)
    }

    availableGroundTilesForBiome(): GameImages[] {
        const availableGroundTiles = Object.values(GAME_IMAGES).filter(obj => 
            obj.spawnAbleInBiomes && obj.spawnAbleInBiomes.includes(this.currentBiome)
        ).map(img => img.name)

        return availableGroundTiles
    }

    selectRandomImage(images: GameImages[]): GameImages { 
        return images[Math.floor(Math.random() * images.length)]
    }

    selectNewBiome(): Biomes {
        return BIOMES[Math.floor(Math.random() * BIOMES.length)]
    }

    loadNewBiome() {
        const newBiome = this.selectNewBiome()


        const selectableImages = Object.values(GAME_IMAGES).filter(obj => obj.spawnAbleInBiomes && obj.spawnAbleInBiomes.includes(newBiome))

        function selectTileImage() {
            return selectableImages[Math.floor(Math.random() * selectableImages.length)]
        }

        game.vehicleManager.despawnAllVehicles()

        game.tiles.flat().forEach(tile => {
            if (!tile.isTile("road")) {
                // tile.setType(newBiome)
                tile.setImage(selectTileImage().name)
            }
        })

        logger.log("Loading new part of the map...")
    }
}