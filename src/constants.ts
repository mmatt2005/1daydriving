export const canvas = document.querySelector("canvas")!
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.backgroundColor = "red"

export const context = canvas.getContext("2d")!
export const TILE_WIDTH = 64
export const TILE_HEIGHT = 64
export const NUM_OF_COLS = Math.round(canvas.width / TILE_WIDTH)
export const NUM_OF_ROWS = Math.ceil(canvas.height / TILE_HEIGHT)
export const DEFAULT_VEHICLE_SPEED = 5
export const DEFAULT_VEHICLE_WIDTH = 50

export const IMAGE_PATH = "/images"


export interface TileAtlasCoord {
    x: number
    y: number
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
        y: 3
    },
    TREE: {
        x: 1,
        y: 3
    }


} satisfies Record<string, TileAtlasCoord>


export type Biomes = "desert" | "forest" | "tundra"
export const BIOMES: Biomes[] = ["desert", "forest", "tundra"]
