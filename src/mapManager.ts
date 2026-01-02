import { GAME_IMAGES, NUM_OF_ROWS, type Biomes, type GameImages } from "./constants"
import { Game, logger } from "./game"
import { MapObject, RockMapObject, TreeMapObject } from "./mapObjects/mapObject"

export class MapManager {
    tiles: Game["tiles"]
    currentBiome: Biomes = "tundra"
    mapObjects: MapObject[] = []

    constructor(tiles: Game["tiles"]) {
        this.tiles = tiles

        console.log("Creating the default map...")

        const availableTiles = this.availableGroundTilesForBiome()

        this.tiles.forEach(col => {
            col.forEach((tile, index) => {
                if (index === (NUM_OF_ROWS / 2)) {
                    tile.setImage("road.png")
                    tile.setType("road.png")
                } else {
                    const test = this.selectRandomImage(availableTiles)
                    console.log(test)
                    tile.setImage(this.selectRandomImage(availableTiles))
                }
            })
        })

        this.addMapObjects()
    }

    reloadMap() {
        this.removeAllMapObjects()
        this.addMapObjects()
    }

    addMapObjects() {
        const mapObjectPerBiome: Record<Biomes, (typeof MapObject)[]> = {
            forest: [TreeMapObject, RockMapObject],
            desert: [],
            tundra: [RockMapObject]
        }

        this.tiles.flat().forEach(tile => {
            if (!tile.isTile("road.png")) {
                const shouldAddMapObjectAtTile = Math.random()

                if (shouldAddMapObjectAtTile >= 0.50) {
                    const biomeObjectsArray = mapObjectPerBiome[this.currentBiome]

                    if (biomeObjectsArray.length === 0) {
                        console.log("Cant do this due to biomeObjectsArray length being 0...")
                        return
                    }

                    const newMapObject = new mapObjectPerBiome[this.currentBiome][Math.floor(Math.random() * biomeObjectsArray.length)]

                    newMapObject.setPosition({ x: tile.x, y: tile.y })
                    newMapObject.width = tile.width
                    newMapObject.height = tile.height

                    this.mapObjects.push(newMapObject)
                }
            }
        })
    }

    availableMapObjectForBiome(): GameImages[] {
        return Object.values(GAME_IMAGES).filter(obj =>
            obj.isMapObject
        ).map(obj => obj.name)
    }

    removeAllMapObjects() {
        this.mapObjects = []
    }

    availableGroundTilesForBiome(): GameImages[] {
        const availableGroundTiles = Object.values(GAME_IMAGES).filter(obj =>
            obj.spawnAbleInBiomes && obj.spawnAbleInBiomes.includes(this.currentBiome)
        ).map(img => img.name)

        return availableGroundTiles
    }

    selectRandomImage(images: GameImages[]): GameImages {
        if (images.length === 0) {
            logger.log("Failed to selectRandomImage due to images param length being 0", "yellow")
            return "truck.png"
        }
        
        return images[Math.floor(Math.random() * images.length)]
    }
}