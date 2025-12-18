import { BIOMES, GAME_IMAGES, type Biomes } from "./constants"
import { game, logger } from "./game"

export class MapManager {
    currentBiome: Biomes

    constructor() {
        this.currentBiome = this.selectNewBiome()

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