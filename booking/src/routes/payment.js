import express from "express"
import { payment } from "../controllers/payment.js"
import { checkUser } from "../middlewares/check_middleware.js"

const route = express.Router()

route.post("/:bookingid",checkUser, payment)

export default route