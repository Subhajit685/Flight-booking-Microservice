import express from "express"
import { cancelBooking, flightBooking, showBookOrder } from "../controllers/booking_controller.js"
import { checkUser } from "../middlewares/check_middleware.js"
const route = express.Router()

route.post("/flight-booking",checkUser, flightBooking)

route.post("/cancle/:bookingID",checkUser, cancelBooking)

route.get("/show/booking/:email", checkUser, showBookOrder)

export default route