import { canvas, ASSETS } from "./constants"
import { eventHandler, game, mapManager, player } from "./game"
import { Entity } from "./map/entity"
import { Bullet } from "./shooting/bullet"
import type { Point } from "./types"

export class Player extends Entity {
    color: string = "yellow"
    movementSpeed: number = 10

    constructor() {
        super()
        this.tileAtlasCoord = ASSETS.PLAYER


        const { x: mapCenterX, y: mapCenterY } = mapManager.centerOfMap()
        this.x = mapCenterX + (canvas.width / 2)
        this.y = mapCenterY + (canvas.height / 2) - this.getHeight()

        eventHandler.subscribe({ fn: this.shoot, type: "mouseClick" })


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
            requestedPosition.x + player.getWidth() / 2 < 0
            ||
            requestedPosition.y + player.getHeight() < 0
        ) return false
        if (
            requestedPosition.x - player.getWidth() / 2 > mapManager.maxX
            ||
            requestedPosition.y - player.getHeight() / 2 > mapManager.maxY
        ) return false

        // Check if the player will be colliding with any entities @ this new position
        if (this.isCollidingWithEntity(requestedPosition)) return false

        return true
    }

    setPosition(newPosition: Point) {
        this.x = newPosition.x
        this.y = newPosition.y
    }

    shoot(event: PointerEvent) {
        console.log("SHOOT!")
        console.log(event)

        const bullet = new Bullet()
        bullet.setPosition({ x: player.x, y: player.y - player.getHeight() })

        game.gameEntities.push(bullet)
    }


    /**
     * @description checks if the player is colliding with a entity with collisions
     * @param {?Point} [beforePoint] a certain point to check if the player would be colliding with a entity. If unused will just default to players x & y pos
     * @returns {boolean} 
     */
    isCollidingWithEntity(beforePoint?: Point): boolean {
        const playerX = beforePoint?.x || player.x
        const playerY = beforePoint?.y || player.y

        const entitiesWithCollisions = mapManager.mapEntities.filter(entity => entity.tileAtlasCoord.collisions)

        const closestEntity = entitiesWithCollisions.sort((objectA, objectB) => {
            const objectADistance = Math.sqrt(Math.pow(playerX - objectA.x, 2) + Math.pow(playerY - objectA.y, 2))
            const objectBDistance = Math.sqrt(Math.pow(playerX - objectB.x, 2) + Math.pow(playerY - objectB.y, 2))

            if (objectADistance < objectBDistance) return -1
            return 0

        })[0]

        // The case where for some reason closestEntity is undefined
        if (!closestEntity) return false


        // Use Axis-Aligned Bounding Box (AABB) collision detection. 
        if (
            closestEntity.x < playerX + player.getWidth() &&
            closestEntity.x + closestEntity.getWidth() > playerX &&
            closestEntity.y < playerY + player.getHeight() &&
            closestEntity.y + closestEntity.getHeight() > playerY
        ) return true

        return false
    }

}