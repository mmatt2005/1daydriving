import { canvas, context } from "../constants"
import { eventHandler, game, player } from "../game"

export class Mouse {
    mouseX: number = 0
    mouseY: number = 0

    constructor() {

        canvas.addEventListener("click", this.onCanvasClick)
        canvas.addEventListener("mousemove", (event) => {

            this.mouseX = event.clientX
            this.mouseY = event.clientY
        })
    }

    /**
     * @description called whenever the canvas is clicked
     * @param {PointerEvent} click 
     */
    onCanvasClick(click: PointerEvent) {

    }



    drawLine(translateX: number, translateY: number) {
        context.strokeStyle = "white"
        context.beginPath()
        context.moveTo(player.x + (player.getWidth() / 2), player.y + (player.getHeight() / 2))
        context.lineTo(this.mouseX + translateX, this.mouseY + translateY)
        context.stroke()
    }

}