import { context } from "../constants"
import { logger } from "../game"
import { EventHandler } from "./eventHandler"

export const COMMANDS = {
    CLEARLOGS: "CLEARLOGS", // Instantly clears all logs
} as const

export class CommandHandler extends EventHandler {
    /**
     * @description an array of all the keys pressed while isCommandActive is true
     * @type {string[]}
     */
    commandKeysPressed: string[] = []
    /**
     * @description if true any key pressed will be registed as a command
     * @type {boolean}
     */
    isCommandActive: boolean = false
    /**
     * @description the key that will activate isCommandActive
     * @type {string}
     */
    commandKey: string = "Shift"

    constructor() {
        super()
        this.subscribe({ fn: this.onKeyPress.bind(this), type: "keyPress" })
        this.subscribe({ fn: this.keyDown.bind(this), type: "keyDown" })
        this.subscribe({ fn: this.keyUp.bind(this), type: "keyUp" })
    }

    /**
     * @description returns if the inputted command is a valid command or not
     * @returns {boolean} 
     */
    isCommand(): boolean {
        return Object.values(COMMANDS).some(c => c === this.formatCommand())
    }

    /**
     * @description returns the formatted command ["P", "O", "P"] => "POP"
     * @returns {string} 
     */
    formatCommand(): string {
        if (this.commandKeysPressed.length === 0) {
            console.log("Failed to format command to due command array length being 0: ", this.commandKeysPressed)
            return ""
        }

        return this.commandKeysPressed.join("")
    }

    executeCommand() {
        const commandFunctions: { command: string, fn: () => void }[] = [
            {
                command: COMMANDS.CLEARLOGS,
                fn: () => logger.clearAllLogs()
            },

        ]
        logger.log(`Execute the following command: ${this.formatCommand()}`)

        const cmd = commandFunctions.find(c => c.command === this.formatCommand())
        if (!cmd) return logger.log(`Failed to excute command: ${this.formatCommand()}`, "red")

        cmd.fn()
    }

    onKeyPress(event: KeyboardEvent) {
        if (this.isCommandActive) {
            this.commandKeysPressed.push(event.key)

            if (this.isCommand()) {
                this.executeCommand()
                this.isCommandActive = false
                this.commandKeysPressed = []
            }
        }
    }

    keyDown(event: KeyboardEvent) {
        if (event.key === this.commandKey) {
            this.isCommandActive = true
        }
    }

    keyUp(event: KeyboardEvent) {
        if (this.isCommandActive && event.key === this.commandKey) {
            this.isCommandActive = false
            this.commandKeysPressed = []
        }
    }

    draw() {
        if (this.isCommandActive) {
            context.font = "32px arial"
            context.fillStyle = "red"
            context.fillText(`COMMAND: ${this.commandKeysPressed.join("")}`, 10, 32)
        }
    }
}