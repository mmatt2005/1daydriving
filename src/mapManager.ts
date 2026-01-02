import { GAME_IMAGES, NUM_OF_ROWS, type Biomes, type GameImages } from "./constants"
import { Game } from "./game"
import { MapObject, TreeMapObject } from "./mapObjects/mapObject"

export class MapManager {
    tiles: Game["tiles"]
    currentBiome: Biomes = "forest"
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
        this.tiles.flat().forEach(tile => {
            if (!tile.isTile("road.png")) {
                const shouldAddMapObjectAtTile = Math.random()

                if (shouldAddMapObjectAtTile >= 0.50) {
                    const newMapObject = new TreeMapObject()
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
        return images[Math.floor(Math.random() * images.length)]
    }
}