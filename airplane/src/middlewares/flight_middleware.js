import { StatusCodes } from "http-status-codes"
import con from "../config/DB_connection.js"
import { timeCalculate } from "../utils/timeCalculare.js"

export const flightValidator = async (req, res, next) => {

    try {
        if (!req.body.flight_name || !req.body.departure_airport_id || !req.body.arrival_airport_id || !req.body.departure_time || !req.body.arrival_time || !req.body.price || !req.body.airplane_id) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: `Allfildes required`,
                data: {}
            })
        }

        const sqlDepartureQuery = "select * from airport where id = ?"
        const [departureAirport] = await con.execute(sqlDepartureQuery, [req.body.departure_airport_id])

        if (!departureAirport[0]) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: `This departure airport not exite.`,
                data: {}
            })
        }

        const sqlArrivalQuery = "select * from airport where id = ?"
        const [arrivalAirport] = await con.execute(sqlArrivalQuery, [req.body.arrival_airport_id])

        if (!arrivalAirport[0]) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: `This arrival airport not exite.`,
                data: {}
            })
        }

        const sqlAirplaneQuery = "select * from airplane where id = ?"
        const [airplane] = await con.execute(sqlAirplaneQuery, [req.body.airplane_id])

        if (!airplane[0]) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: `This airplane not exite.`,
                data: {}
            })
        }

        const timeDifference = timeCalculate(req.body.departure_time, req.body.arrival_time)

        if(!timeDifference){
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: `Please make arrival time than departure time.`,
                data: {}
            })
        }

        next()
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: `Internal server error`,
            data: {}
        })
    }
}