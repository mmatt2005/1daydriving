import { BIOMES, NUM_OF_COLS, NUM_OF_ROWS, TILE_HEIGHT, TILE_WIDTH, type BiomeObject } from "../constants";
import { Entity } from "./entity";
import { Tile } from "./tile";
import { MapSize, type Point } from "../types";

export class MapManager {
    tiles: Tile[][] = []
    cachedTiles: {
        left: Tile[][],
        right: Tile[][]
    } = { left: [], right: [] }
    mapEntities: Entity[] = []
    biome: BiomeObject = BIOMES.forest

    /**
     * @description the maximum x value on the map (farthest right point)
     * @type {number}
     */
    maxX: number

    /**
     * @description the maximum y value on the map (farthest bottom point)
     * @type {number}
     */
    maxY: number

    constructor() {
        const size = MapSize.small * NUM_OF_COLS
        const gameMap: Tile[][] = Array.from({ length: size }, () => [])

        for (const [rowIndex, row] of gameMap.entries()) {
            for (let t = 0; t < size; t++) {
                const tileX = rowIndex * TILE_WIDTH
                const tileY = t * TILE_HEIGHT
                const tile = new Tile(tileX, tileY)
                tile.tileAtlasCoord = this.biome.groundTiles[Math.floor(Math.random() * this.biome.groundTiles.length)]

                row.push(tile)
            }

        }

        this.tiles = gameMap

        this.maxX = this.tiles[this.tiles.length - 1][0].x
        this.maxY = this.tiles[0][this.tiles[0].length - 1].y


        this.populateMap()
    }


    centerOfMap(): Point {

        return {
            x: ((MapSize.small * NUM_OF_COLS) * TILE_WIDTH) / 2,
            y: ((MapSize.small * NUM_OF_ROWS) * TILE_HEIGHT) / 2
        }
    }


    /**
     * @description populates the map with entities
     * @private
     */
    private populateMap(): void {
        if (this.mapEntities.length > 0) {
            console.log("Failed to populate map with entities due to map already having entities...")
            return
        }


        // Use a arrow function instead of a normal function so we can inherit "this" from the global scope.
        const generateRandomPoint = (): Point => {
            return {
                x: Math.floor(Math.random() * this.maxX),
                y: Math.floor(Math.random() * this.maxY)
            }
        }

        for (let i = 0; i < 100; i++) {
            const entity = new Entity()
            entity.setPosition(generateRandomPoint())
            entity.tileAtlasCoord = this.biome.entityTiles[Math.floor(Math.random() * this.biome.entityTiles.length)]

            this.mapEntities.push(entity)
        }
    }
}