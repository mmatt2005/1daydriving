import type { Biomes, GameImages } from "../constants";
import { Entity } from "../entity";

export class MapObject extends Entity {
    biome: Biomes[] = []
}

export class TreeMapObject extends MapObject {     
    constructor() { 
        super()
        this.biome = ["forest"]

        const availableTreeTypes: GameImages[] = ["tree1.png", "tree2.png", "tree3.png", "dead_tree.png"]
        
        this.setImage(availableTreeTypes[Math.floor(Math.random() * availableTreeTypes.length)])
    
    }
}

export class RockMapObject extends MapObject { 
    constructor() {
        super()
        this.biome = ["forest", "tundra"]

        const availableRockTypes: GameImages[] = ["rock1.png", "rock2.png", "rock3.png"]

        this.setImage(availableRockTypes[Math.floor(Math.random() * availableRockTypes.length)])
    }
}
