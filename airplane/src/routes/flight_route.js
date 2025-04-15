import express from "express";
import {
  crateFlight,
  deleteFlight,
  filerFlight,
  getAllFlight,
  getFlightById,
  seatDic,
  seatInc,
} from "../controllers/flight_controller.js";
import { flightValidator } from "../middlewares/flight_middleware.js";
const router = express.Router();

router.post("/", flightValidator, crateFlight);

router.get("/", getAllFlight);

router.get("/by-id/:id", getFlightById);

// router.patch("/:id", updateAirport)

router.delete("/del/:id", deleteFlight);

router.get("/filter", filerFlight);

router.post("/dic/:seat/:flightID", seatDic);

router.post("/inc/:seat/:flightID", seatInc);

export default router;
