import { game } from "./game"
import { getRoadBottomLane } from "./helpers"
import { Vehicle } from "./vehicle"

export class VehicleManager {
    vehicles: Vehicle[] = []

    constructor() {

        setTimeout(() => { 
            this.spawnVehicle()
        }, 2500)
    }

    spawnVehicle() {
        const vehicle = new Vehicle()
        vehicle.setPosition(
            {
                x: 900,
                y: getRoadBottomLane(game.tiles).y
            }
        )
        vehicle.moveRight()


        vehicle.onMove = () => { 
            console.log("THE VEHICLE IS MOVING!!!")

            if (vehicle.isAtBorder()) { 
                console.log("THE VEHICLE IS AT THE BORDER")
                this.despawnVehicle(vehicle)
                vehicle.removeInterval()
            }

        }
        this.vehicles.push(vehicle)
    }

    despawnVehicle(vehicle: Vehicle) {
        this.vehicles = this.vehicles.filter(veh => veh.id !== vehicle.id)
    }

    despawnAllVehicles() {
        this.vehicles = []
    }

    draw() {
        this.vehicles.forEach(vehicle => vehicle.draw())
    }
}