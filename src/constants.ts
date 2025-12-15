import type { GameImage } from "./types"

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

export const GAME_IMAGES: {name: string}[] = [
    {
        name: "clover 1.png"
    },
    {
        name: "dirt 1.png"
    },
    {
        name: "grass1.png"
    },
    {
        name: "rock 1.png"
    },
    {
        name: "sand 1.png"
    },
    {
        name: "hotdog.png"
    },
    {
        name: "loading.png"
    },

]