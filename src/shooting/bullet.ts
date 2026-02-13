import { ASSETS } from "../constants"
import { Entity } from "../map/entity"

export class Bullet extends Entity {
    constructor() {
        super()
        this.tileAtlasCoord = ASSETS.BULLET
     
        
        console.log(this.getEntityAssetDimensions())
    }
}