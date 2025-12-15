import { context, TILE_WIDTH, TILE_HEIGHT } from "./constants"
import { Entity } from "./entity"
import { imageManager } from "./game"

export class Tile extends Entity {
    type: "road" | "forest" | "desert" | "tundra" = "forest"
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

    draw() {

        if (imageManager.images.length > 0) {
            context.drawImage(imageManager.images[0].image, this.x, this.y, this.width, this.height)
        } else {
            context.fillStyle = this.color
            context.fillRect(this.x, this.y, this.width, this.height)

            // DRAW BORDER
            context.strokeStyle = "white"
            context.lineWidth = 2
            context.strokeRect(this.x, this.y, this.width, this.height)

            // DRAW THE YELLOW DASHES FOR ROAD TILES ONLY!
            if (this.type === "road") {
                context.setLineDash([10, 10])
                context.strokeStyle = "yellow"
                context.beginPath()
                context.moveTo(this.x, (this.y + (this.height / 2)))
                context.lineTo((this.x + this.width), (this.y + (this.height / 2)))
                context.stroke()
                context.setLineDash([])
            }
        }
    }
}