import con from "../config/DB_connection.js"
import { StatusCodes } from "http-status-codes"
import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

export const flightBooking = async (req, res) =>{
    const {flight_id, mobile, candidates, num_candidates, total_price} = req.body

    if(!flight_id, !mobile, !candidates, !num_candidates, !total_price){
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: `All fileds requried.`,
            data: {}
        })
    }

    const sqlQuery = "insert into flight_bookings (flight_id, mobile, candidates, num_candidates, totel_price, booked_at, payment_at) values (?, ?, ?, ?, ?, NOW(), null);"
    try {
        const responce = await axios.get(`${process.env.AIRPLANE_BASE_URL}/api/flight/by-id/${flight_id}`)
        const flight = await responce.data.data.flight
        if(flight.length === 0){
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: `No flight found. Please try again.`,
                data: {}
            })
        }
        const [booking] = await con.execute(sqlQuery, [flight_id, mobile, JSON.stringify(candidates), num_candidates, total_price])
        if(booking.affectedRows > 0){

            const responce = await axios.post(`${process.env.AIRPLANE_BASE_URL}/api/flight/dic/${num_candidates}/${flight_id}`)
            console.log(responce.data)

            return res.status(StatusCodes.CREATED).json({
                success: true,
                message: `Payment not complete.`,
                data: {id : booking.insertId}
            })
        }
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: `Some problem occer. Please try again.`,
            data: {}
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: `Internal server error`,
            data: {error}
        })
    }
}

export const cancelBooking = async(req, res) =>{
    const {bookingID} = req.params
    const sql = `select * from flight_bookings where id = ?;`;
    const delsql = `DELETE FROM flight_bookings WHERE id = ?;`;
    try {
        const [booking] = await con.execute(sql, [bookingID])
        if(booking.length > 0){
            const responce = await axios.post(`${process.env.AIRPLANE_BASE_URL}/api/flight/inc/${booking[0].num_candidates}/${booking[0].flight_id}`)

            const [result] = await con.execute(delsql, [bookingID])
            if(result.affectedRows > 0){
                return res.status(StatusCodes.OK).json({
                    success: true,
                    message: `Cancle successfully.`,
                    data: {}
                })
            }
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: `Some problem occer. Please try again.`,
                data: {}
            })
        }
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: `Some problem occer. Please try again.`,
            data: {}
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: `Internal server error`,
            data: {error}
        })
    }
}