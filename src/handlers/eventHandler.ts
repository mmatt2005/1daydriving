type SubscriptionEventType = "mouseClick" | "keyPress" | "keyDown" | "keyUp"

interface Subscription {
    fn: (event?: any) => void
    type: SubscriptionEventType
}

export class EventHandler {
    subscriptions: Subscription[] = []

    brodcast(type: SubscriptionEventType, event?: any) {
        this.subscriptions.filter(sub => sub.type === type).forEach(sub => sub.fn(event))
    }

    unsubscribe(subscription: Subscription) {
        this.subscriptions = this.subscriptions.filter(sub => sub.fn !== subscription.fn)
    }

    subscribe(subscription: Subscription) {
        this.subscriptions.push(subscription)
    }

    constructor() {
        window.addEventListener("click", (event) => this.brodcast("mouseClick", event))
        window.addEventListener("keypress", (event) => this.brodcast("keyPress", event))
        window.addEventListener("keydown", (event) => this.brodcast("keyDown", event))
        window.addEventListener("keyup", (event) => this.brodcast("keyUp", event))
    }
}

