import { canvas, TILE_ATLAS_COORDS } from "./constants"
import { game, mapManager, player } from "./game"
import { Entity } from "./map/entity"
import type { Point } from "./types"

export class Player extends Entity {
    color: string = "yellow"
    movementSpeed: number = 50

    constructor() {
        super()
        this.tileAtlasCoord = TILE_ATLAS_COORDS.PLAYER
        this.width = 64
        this.height = 64

        const { x: mapCenterX, y: mapCenterY } = mapManager.centerOfMap()
        this.x = mapCenterX + (canvas.width / 2)
        this.y = mapCenterY + (canvas.height / 2) - this.height


        document.addEventListener("keydown", event => {
            switch (event.key) {
                case "w": {
                    const newPosition: Point = { x: this.x, y: this.y - this.movementSpeed }

                    if (this.canMove(newPosition)) {
                        game.translateY -= this.movementSpeed
                        this.setPosition(newPosition)
                    }

                    break
                }
                case "a": {
                    const newPosition: Point = { x: this.x - this.movementSpeed, y: this.y }

                    if (this.canMove(newPosition)) {
                        game.translateX -= this.movementSpeed
                        this.setPosition(newPosition)
                    }

                    break
                }
                case "s": {
                    const newPosition: Point = { x: this.x, y: this.y + this.movementSpeed }

                    if (this.canMove(newPosition)) {
                        game.translateY += this.movementSpeed
                        this.setPosition(newPosition)
                    }
                }
                    break
                case "d": {
                    const newPosition: Point = { x: this.x + this.movementSpeed, y: this.y }

                    if (this.canMove(newPosition)) {
                        game.translateX += this.movementSpeed
                        this.setPosition(newPosition)
                    }

                    break
                }
            }
        })
    }


    /**
     * @description checks if the player can move to a position.
     *
     * @param {Point} requestedPosition 
     * @returns {boolean} 
     */
    canMove(requestedPosition: Point): boolean {
        // Is the requestedPosition still on the map?
        if (
            requestedPosition.x + player.width / 2 < 0
            ||
            requestedPosition.y + player.height < 0
        ) return false
        if (
            requestedPosition.x - player.width / 2 > mapManager.maxX
            ||
            requestedPosition.y - player.height / 2 > mapManager.maxY
        ) return false

        return true
    }

    setPosition(newPosition: Point) {
        this.x = newPosition.x
        this.y = newPosition.y
    }
}