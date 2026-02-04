export interface Point {
    x: number
    y: number
}

export interface GameImage {
    name: string
    image: HTMLImageElement
}



/**
 * @description the size of the game map
 * @export
 * @enum {number}
 */
export enum MapSize {
    small = 3,
    medium = 6,
    large = 9
}
