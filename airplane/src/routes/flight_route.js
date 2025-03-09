import express from "express"
import { crateFlight, getAllFlight, getFlightById } from "../controllers/flight_controller.js"
import { flightValidator } from "../middlewares/flight_middleware.js"
const router = express.Router()

router.post("/", flightValidator, crateFlight)

router.get("/", getAllFlight)

router.get("/:id", getFlightById)

// router.patch("/:id", updateAirport)

// router.delete("/:id", deleteAirport)

export default router