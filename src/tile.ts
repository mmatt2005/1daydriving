import { TILE_HEIGHT, TILE_WIDTH } from "./constants"
import { Entity } from "./entity"

export class Tile extends Entity {
    type: "road" | "forest" | "desert" | "tundra" = "forest"
    color: string = "Moccasin"

    constructor(x: number, y: number) {
        super()
        this.x = x
        this.y = y
        this.width = TILE_WIDTH
        this.height = TILE_HEIGHT

        this.setImage("grass2.png")
    }

    setType(newType: Tile["type"]) {
        this.type = newType

        // When the type changes update the color of the tile to reflect the new type
        switch (newType) {
            case "forest":
                this.color = "green"
                break
            case "desert":
                this.color = "Moccasin"
                break
            case "tundra":
                this.color = "blue"
                break
            case "road":
                this.color = "black"
                this.setImage("stone 1.png")
                break
        }
    }

    /**
     * @description checks to see a if the tile is a given tile type
     * @param {Tile["type"]} selectedTileType the type to check if the tile is
     * @returns {boolean} 
     */
    isTile(selectedTileType: Tile["type"]): boolean {
        return this.type === selectedTileType
    }

    setColor(newColor: string) {
        this.color = newColor
    }
}