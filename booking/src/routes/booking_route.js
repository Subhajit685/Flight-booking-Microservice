import express from "express"
import { cancelBooking, flightBooking } from "../controllers/booking_controller.js"
const route = express.Router()

route.post("/flight-booking", flightBooking)

route.post("/cancle/:bookingID", cancelBooking)

export default route