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

export type GameImages = "taxi.png" | "station.png" |
    "hotdog.png" | "truck.png" | "sports_race.png" | "grass1.png" | "grass2.png" | "grass3.png" | "grass_d1.png" |
    "grass_d2.png" | "grass_d3.png" | "tree1.png" | "tree2.png" | "tree3.png" | "road.png"

    export const GAME_IMAGES: Record<string, { name: GameImages, spawnAbleInBiomes?: Biomes[], isMapObject?: boolean }> = {
        TAXI: {
            name: "taxi.png"
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
        GRASS2: {
            name: "grass2.png",
            spawnAbleInBiomes: ["forest"]
        },
        GRASS3: {
            name: "grass3.png",
            spawnAbleInBiomes: ["forest"]
        },
        GRASS_D1: {
            name: "grass_d1.png",
            spawnAbleInBiomes: ["forest"]
        },
        GRASS_D2: { 
            name: "grass_d2.png",
            spawnAbleInBiomes: ["forest"]
        },
        GRASS_D3: {
            name: "grass_d3.png",
            spawnAbleInBiomes: ["forest"]
        },
        TREE1: {
            name: "tree1.png",
            isMapObject: true
        },
        TREE2: {
            name: "tree2.png",
            isMapObject: true
        },
        TREE3: {
            name: "tree3.png",
            isMapObject: true
        },
        HOTDOG: {
            name: "hotdog.png"
        },
        ROAD: {
            name: "road.png"
        }
    }


export type Biomes = "desert" | "forest" | "tundra"
export const BIOMES: Biomes[] = ["desert", "forest", "tundra"]

