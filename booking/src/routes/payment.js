import express from "express"
import { payment } from "../controllers/payment.js"

const route = express.Router()

route.post("/:bookingid", payment)

export default route