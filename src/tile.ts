import { TILE_HEIGHT, TILE_WIDTH, type GameImages } from "./constants"
import { Entity } from "./entity"

export class Tile extends Entity {
    type: GameImages | "unset" = "unset"
    color: string = "Moccasin"

    constructor(x: number, y: number) {
        super()
        this.x = x
        this.y = y
        this.width = TILE_WIDTH
        this.height = TILE_HEIGHT
    }

    setType(newType: Tile["type"]) {
        this.type = newType
    }

    /**
     * @description checks to see a if the tile is a given tile type
     * @param {Tile["type"]} selectedTileType the type to check if the tile is
     * @returns {boolean} 
     */
    isTile(selectedTileType: Tile["type"]): boolean {
        return this.type === selectedTileType
    }
}