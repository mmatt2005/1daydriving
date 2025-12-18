export const canvas = document.querySelector("canvas")!
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.backgroundColor = "blue"

export const context = canvas.getContext("2d")!
export const NUM_OF_COLS = 20
export const NUM_OF_ROWS = 20
export const TILE_WIDTH = Math.ceil(canvas.width / NUM_OF_ROWS)
export const TILE_HEIGHT = Math.round(canvas.height / NUM_OF_COLS)
export const PLAYER_WIDTH = 100
export const PLAYER_HEIGHT = TILE_HEIGHT / 2
export const DEFAULT_VEHICLE_SPEED = 5
export const DEFAULT_VEHICLE_WIDTH = 50

export const IMAGE_PATH = "/images"

export type GameImages = "taxi.png" | "stone 1.png" | "stone 2.png" | "station.png" |
    "rock 1.png" | "hotdog.png" | "grass1.png" | "grass2.png" | "truck.png" | "sports_race.png" |
    "snow 1.png" | "sand 1.png" | "pine-full01.png" | "pine-full02.png" | "cactus01.png" | "cactus02.png" |
    "bigtree01.png" | "bigtree02.png"

export const GAME_IMAGES: Record<string, { name: GameImages, spawnAbleInBiomes?: Biomes[] }> = {
    TAXI: {
        name: "taxi.png"
    },
    STONE1: {
        name: "stone 1.png",
    },
    TRUCK: {
        name: "truck.png"
    },
    SPORTS_RACE: {
        name: "sports_race.png"
    },
    GRASS1: {
        name: "grass1.png",
        spawnAbleInBiomes: ["forest"]
    },
    SNOW1: {
        name: "snow 1.png",
        spawnAbleInBiomes: ["tundra"]
    },
    SAND1: {
        name: "sand 1.png",
        spawnAbleInBiomes: ["desert"]
    },
    GRASS2: {
        name: "grass2.png",
        spawnAbleInBiomes: ["forest"]
    },
    HOTDOG: {
        name: "hotdog.png"
    },
    PINEFULL1: {
        name: "pine-full01.png",
        spawnAbleInBiomes: ["tundra"]
    },
    PINEFULL2: {
        name: "pine-full02.png",
        spawnAbleInBiomes: ["tundra"]
    },
    CACTUS1: {
        name: "cactus01.png",
        spawnAbleInBiomes: ["desert"]
    },
    CACTUS2: {
        name: "cactus02.png",
        spawnAbleInBiomes: ["desert"]
    },
    BIGTREE1: {
        name: "bigtree01.png",
        spawnAbleInBiomes: ["forest"]
    },
    BIGTREE2: {
        name: "bigtree02.png",
        spawnAbleInBiomes: ["forest"]
    }
}


export type Biomes = "desert" | "forest" | "tundra"
export const BIOMES: Biomes[] = ["desert", "forest", "tundra"]

