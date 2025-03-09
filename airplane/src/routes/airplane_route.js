import express from "express"
import { crateAirplane, deleteAirplane, getAirplaneById, getAllAirplane, updateAirplane } from "../controllers/airplane_controller.js"
import { airplaneValidation } from "../middlewares/airplane_middleware.js"
const router = express.Router()

router.post("/", airplaneValidation, crateAirplane)

router.get("/", getAllAirplane)

router.get("/:id", getAirplaneById)

router.patch("/:id", updateAirplane)

router.delete("/:id", deleteAirplane)

export default router