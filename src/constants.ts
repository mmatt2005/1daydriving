export const canvas = document.querySelector("canvas")!
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.backgroundColor = "red"

export const context = canvas.getContext("2d")!
export const TILE_WIDTH = 64
export const TILE_HEIGHT = 64
export const NUM_OF_COLS = Math.round(canvas.width / TILE_WIDTH)
export const NUM_OF_ROWS = Math.ceil(canvas.height / TILE_HEIGHT)
export const IMAGE_PATH = "/images"


export interface TileAtlasCoord {
    x: number
    y: number
    collisions?: boolean

    /*
    By default all tiles are 64x64 but for certain tiles (bullets) we need a custom x and y so that what these attributes are for!
    */
    width?: number
    height?: number
}

export const TILE_ATLAS_COORDS = {
    GRASS_DETAILED: {
        x: 0,
        y: 1,
    },
    GRASS: {
        x: 0,
        y: 0,
    },
    SAND_DETAILED: {
        x: 1,
        y: 1,
    },
    SAND: {
        x: 1,
        y: 0,
    },
    PLAYER: {
        x: 0,
        y: 2,
    },
    DEV: {
        x: 1,
        y: 2,
    },
    CACTUS: {
        x: 0,
        y: 3,
        collisions: true
    },
    TREE: {
        x: 1,
        y: 3,
        collisions: true
    },
    ROCKS: {
        x: 0,
        y: 4,
    },
    LARGE_ROCK: {
        x: 1,
        y: 4,
        collisions: true
    },
    ROSE: {
        x: 2,
        y: 4,
        collisions: true
    },
    BULLET: {
        x: 2,
        y: 3,
        width: 32,
        height: 32
    }


} satisfies Record<string, TileAtlasCoord>

export interface BiomeObject {
    /**
     * @description all the ground tiles that can be spawned in the biome
     * @type {TileAtlasCoord[]}
     */
    groundTiles: TileAtlasCoord[],
    /**
     * @description all the entities (tree, cactus) that can be spawned in the biome
     * @type {TileAtlasCoord[]}
     */
    entityTiles: TileAtlasCoord[]
}

export type BiomeTypes = "forest" | "desert"

export const BIOMES = {
    forest: {
        groundTiles: [TILE_ATLAS_COORDS.GRASS, TILE_ATLAS_COORDS.GRASS_DETAILED],
        entityTiles: [TILE_ATLAS_COORDS.TREE, TILE_ATLAS_COORDS.ROCKS, TILE_ATLAS_COORDS.LARGE_ROCK, TILE_ATLAS_COORDS.ROSE]
    },
    desert: {
        groundTiles: [TILE_ATLAS_COORDS.SAND, TILE_ATLAS_COORDS.SAND_DETAILED],
        entityTiles: [TILE_ATLAS_COORDS.CACTUS]
    }
} satisfies Record<BiomeTypes, BiomeObject>
