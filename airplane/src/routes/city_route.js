import express from "express"
import { cityValidator } from "../middlewares/city_middleware.js"
import { crateCity, deleteCity, getAllCitys, getCityById, updateCity } from "../controllers/city_controller.js"
const router = express.Router()

router.post("/", cityValidator, crateCity)

router.get("/", getAllCitys)

router.get("/:id", getCityById)

router.patch("/:id", updateCity)

router.delete("/:id", deleteCity)

export default router