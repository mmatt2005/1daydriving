import type { GameImages } from "../constants";
import { Entity } from "../entity";

export class MapObject extends Entity { 

}

export class TreeMapObject extends MapObject {     
    constructor() { 
        super()
        const availableTreeTypes: GameImages[] = ["tree1.png", "tree2.png", "tree3.png"]

        this.setImage(availableTreeTypes[Math.floor(Math.random() * availableTreeTypes.length)])
    
    }
}