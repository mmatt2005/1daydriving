import { canvas, context } from "./constants"

interface Log {
    log: string
    priority: "red" | "green" | "blue" | "yellow"
}
export class Logger {
    logs: Log[] = []

    log(log: string, priority?: Log["priority"], log2Console: boolean = false) {
        this.logs.push({ log: log, priority: priority || "blue" })

        if (priority === "red" || log2Console) {
            console.log(log)
        }
    }

    removeLog(log: string) {
        this.logs = this.logs.filter(l => l.log !== log)
    }

    removeOldestLog() {
        this.logs.shift()
    }

    clearAllLogs() {
        this.logs = []
    }

    draw() {
        if (this.logs.length === 0) return 

        const textSize = 16
        const padding = textSize / 2

        const test = textSize * this.logs.length + padding
        context.fillStyle = "black"
        context.fillRect(0, canvas.height - test, 500, test)
        
        this.logs.forEach((log, index) => {
            context.font = `${textSize}px arial`
            context.fillStyle = log.priority
            context.fillText(log.log + ` ${index + 1}`, 0, canvas.height - textSize * (index + 1) + padding)
        })
    }
}