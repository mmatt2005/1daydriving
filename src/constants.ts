import type { TileSheets } from "./imageManager"

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


export interface Asset {
    x: number
    y: number
    tilesheet: TileSheets
    collisions?: boolean
}

const ASSETS_16 = {
    BULLET: {
        x: 0,
        y: 0,
        tilesheet: "tilesheet16.png"
    }

} satisfies Record<string, Asset>

const ASSETS_64 = {
    GRASS_DETAILED: {
        x: 0,
        y: 1,
        tilesheet: "tilesheet_64x64.png",
    },
    GRASS: {
        x: 0,
        y: 0,
        tilesheet: "tilesheet_64x64.png",

    },
    SAND_DETAILED: {
        x: 1,
        y: 1,
        tilesheet: "tilesheet_64x64.png",

    },
    SAND: {
        x: 1,
        y: 0,
        tilesheet: "tilesheet_64x64.png",

    },
    PLAYER: {
        x: 0,
        y: 2,
        tilesheet: "tilesheet_64x64.png",

    },
    DEV: {
        x: 1,
        y: 2,
        tilesheet: "tilesheet_64x64.png",

    },
    CACTUS: {
        x: 0,
        y: 3,
        collisions: true,
        tilesheet: "tilesheet_64x64.png",

    },
    TREE: {
        x: 1,
        y: 3,
        collisions: true,
        tilesheet: "tilesheet_64x64.png",

    },
    ROCKS: {
        x: 0,
        y: 4,
        tilesheet: "tilesheet_64x64.png",

    },
    LARGE_ROCK: {
        x: 1,
        y: 4,
        collisions: true,
        tilesheet: "tilesheet_64x64.png",

    },
    ROSE: {
        x: 2,
        y: 4,
        collisions: true,
        tilesheet: "tilesheet_64x64.png",

    },
} satisfies Record<string, Asset>


export const ASSETS = {
    ...ASSETS_16,
    ...ASSETS_64
} satisfies Record<string, Asset>

export interface BiomeObject {
    /**
     * @description all the ground tiles that can be spawned in the biome
     * @type {Asset[]}
     */
    groundTiles: Asset[],
    /**
     * @description all the entities (tree, cactus) that can be spawned in the biome
     * @type {Asset[]}
     */
    entityTiles: Asset[]
}

export type BiomeTypes = "forest" | "desert"

export const BIOMES = {
    forest: {
        groundTiles: [ASSETS.GRASS, ASSETS.GRASS_DETAILED],
        entityTiles: [ASSETS.TREE, ASSETS.ROCKS, ASSETS.LARGE_ROCK, ASSETS.ROSE]
    },
    desert: {
        groundTiles: [ASSETS.SAND, ASSETS.SAND_DETAILED],
        entityTiles: [ASSETS.CACTUS]
    }
} satisfies Record<BiomeTypes, BiomeObject>
