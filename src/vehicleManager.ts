import { game, logger } from "./game"
import { getRoadBottomLane } from "./helpers"
import { SportsCar, Truck, Vehicle } from "./vehicle"

export class VehicleManager {
    vehicles: Vehicle[] = []

    moveVehicles() { 
        this.vehicles.forEach(veh => { 
            if (veh.isAtBorder()) { 
                this.despawnVehicle(veh)
                return
            }

            if (veh.direction === "right") { 
                veh.x += veh.speed
            } else { 
                veh.x -= veh.speed
            }
        })
    
    }

    spawnVehicle(type?: SportsCar | Truck) {
        const vehicle = type || new Vehicle()
        vehicle.setPosition(
            {
                x: 900,
                y: getRoadBottomLane(game.tiles).y
            }
        )

        this.vehicles.push(vehicle)
    }

    despawnVehicle(vehicle: Vehicle) {
        logger.log(`Despawning Vehicle: ` + vehicle.id, "yellow")
        this.vehicles = this.vehicles.filter(veh => veh.id !== vehicle.id)
    }

    despawnAllVehicles() {
        this.vehicles = []
    }

    draw() {
        this.vehicles.forEach(vehicle => vehicle.draw())
    }
}