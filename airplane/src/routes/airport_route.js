import express from "express"
import { airportValidator } from "../middlewares/airport_middleware.js"
import { crateAirport, deleteAirport, getAirportById, getAllAirport, updateAirport } from "../controllers/airport_controller.js"
const router = express.Router()

router.post("/", airportValidator, crateAirport)

router.get("/", getAllAirport)

router.get("/:id", getAirportById)

router.patch("/:id", updateAirport)

router.delete("/:id", deleteAirport)

export default router