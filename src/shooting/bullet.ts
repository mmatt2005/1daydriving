import { TILE_ATLAS_COORDS } from "../constants"
import { Entity } from "../map/entity"

export class Bullet extends Entity {
    constructor() {
        super()
        this.tileAtlasCoord = TILE_ATLAS_COORDS.BULLET
        
        this.setDimensions(32, 32)
    }
}