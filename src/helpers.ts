import { NUM_OF_ROWS, TILE_HEIGHT } from "./constants";
import { Game } from "./game";
import type { Point } from "./types";


/**
 * @description gets the top left point of the road (the top lane) if center parameter is passed it will return the center point of the top lane instead
 * @export
 * @param {Game["tiles"]} tiles 
 * @param {boolean} [center=false] 
 * @returns {(Point | null)} 
 */
export function getRoadTopLane(tiles: Game["tiles"], center = false): Point {
    if (!isNumOfRowsEven()) {
        console.log("Failed to getRoadTopLane due to num of rows not being even...")
        return { x: 0, y: 0 }
    }

    const roadRow = NUM_OF_ROWS / 2
    const tile = tiles[0][roadRow]


    let updatedYValue = tile.y
    if (center) {
        updatedYValue = tile.y + (TILE_HEIGHT / 4)
    }

    return { x: tile.x, y: updatedYValue }
}


/**
 * @description gets the bottom point (right under the dashes) of the bottom lane if center parameter is passed it will return the center point of the bottom lane instead.
 * @export
 * @param {Game["tiles"]} tiles 
 * @param {boolean} [center=false] 
 * @returns {(Point | null)} 
 */
export function getRoadBottomLane(tiles: Game["tiles"], center = false): Point {
    if (!isNumOfRowsEven()) {
        console.log("Failed to getRoadBottomLane due to num of rows not being even...")
        return { x: 0, y: 0 }
    }

    const roadRow = NUM_OF_ROWS / 2
    const tile = tiles[0][roadRow]


    let updatedYValue = tile.y + (TILE_HEIGHT / 2)
    if (center) {
        updatedYValue += (TILE_HEIGHT / 4)
    }

    return { x: tile.x, y: updatedYValue }
}


/**
 * @description checks if the NUM_OF_ROWS constant is even. Its important that this is even so that we can generate the road
 * @export
 * @returns {boolean} 
 */
export function isNumOfRowsEven(): boolean {
    return NUM_OF_ROWS % 2 === 0
}