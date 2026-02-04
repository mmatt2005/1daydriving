import { canvas, NUM_OF_COLS, NUM_OF_ROWS, TILE_ATLAS_COORDS, TILE_HEIGHT, TILE_WIDTH } from "./constants";
import { Entity } from "./entity";
import { game, player } from "./game";
import { Tile } from "./tile";
import { MapSize, type Point } from "./types";

export class NewMapManager {
    tiles: Tile[][] = []
    cachedTiles: {
        left: Tile[][],
        right: Tile[][]
    } = { left: [], right: [] }
    mapEntities: Entity[] = []

    
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
                tile.tileAtlasCoord = TILE_ATLAS_COORDS.GRASS

                row.push(tile)
            }

        }

        this.tiles = gameMap

        this.maxX = this.tiles[this.tiles.length - 1][0].x
        this.maxY = this.tiles[0][this.tiles[0].length - 1].y


        // // Create the tiles that will be in view by default
        // for (let col = 0; col < NUM_OF_COLS; col++) {
        //     this.tiles.push([])
        //     for (let row = 0; row < NUM_OF_ROWS; row++) {
        //         const tile = new Tile(col * TILE_WIDTH, row * TILE_HEIGHT)

        //         const availableTiles = [TILE_ATLAS_COORDS.GRASS, TILE_ATLAS_COORDS.GRASS_DETAILED]
        //         tile.tileAtlasCoord = availableTiles[Math.floor(Math.random() * availableTiles.length)]

        //         this.tiles[col].push(tile)
        //     }
        // }

        // // Add the tiles that will not be in view by default
        // this.addUnViewableColRight()
        // this.addUnViewableColLeft("green")

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

        function generateRandomPoint(): Point {
            return {
                x: Math.floor(Math.random() * canvas.width),
                y: Math.floor(Math.random() * canvas.height)
            }
        }

        for (let i = 0; i < 30; i++) {
            const entity = new Entity()
            entity.setPosition(generateRandomPoint())
            entity.tileAtlasCoord = TILE_ATLAS_COORDS.TREE

            this.mapEntities.push(entity)
        }
    }

    addUnViewableColRight(color?: string) {

        // Check cache first
        if (this.cachedTiles.right.length > 0) {
            this.tiles.push(this.cachedTiles.right[this.cachedTiles.right.length - 1])
            this.cachedTiles.right.pop()
            return
        }

        const firstHiddenColNewX = this.tiles[this.tiles.length - 1][0].x + TILE_WIDTH
        this.tiles.push([])
        for (let row = 0; row < NUM_OF_ROWS; row++) {
            const newT = new Tile(firstHiddenColNewX, row * TILE_HEIGHT)
            newT.setColor("orange")
            this.tiles[this.tiles.length - 1].push(newT)
        }
    }

    addUnViewableColLeft(color?: string) {

        // Check cache first!
        if (this.cachedTiles.left.length > 0) {
            this.tiles.unshift(this.cachedTiles.left[this.cachedTiles.left.length - 1])
            this.cachedTiles.left.pop()
            return
        }

        const prevX = this.tiles[0][0].x
        this.tiles.unshift([])

        for (let row = 0; row < NUM_OF_ROWS; row++) {
            const newTile = new Tile(prevX - TILE_WIDTH, row * TILE_HEIGHT)
            newTile.setColor(color || "pink")
            this.tiles[0].push(newTile)
        }

        // console.log(this.tiles)
    }

    cacheRightCol() {
        this.cachedTiles.right.push(this.tiles[this.tiles.length - 1])
        this.tiles.pop()

        console.log("CACHED TILES BELOW")
        console.log(this.cachedTiles)
    }

    cacheLeftCol() {
        this.cachedTiles.left.push(this.tiles[0])
        this.tiles.shift()

        console.log("CACHED TILES BELOW")
        console.log(this.cachedTiles)
    }

    addEntity(): void {
        const newEntity = new Entity()
        newEntity.tileAtlasCoord = TILE_ATLAS_COORDS.CACTUS
        newEntity.x = 500
        newEntity.y = 500

        const treeEntity = new Entity()
        treeEntity.tileAtlasCoord = TILE_ATLAS_COORDS.TREE
        treeEntity.x = 1000
        treeEntity.y = 500

        this.mapEntities.push(newEntity, treeEntity)

    }
}