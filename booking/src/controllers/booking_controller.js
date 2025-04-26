import con from "../config/DB_connection.js"
import { StatusCodes } from "http-status-codes"
import axios from "axios"
import dotenv from "dotenv"
import { connectMq, DELconnectMq } from "../config/rabbit_mp.js"
dotenv.config()

export const flightBooking = async (req, res) =>{
    const {flight_id, email, candidates, num_candidates, total_price} = req.body
    const connection = await con.getConnection()

    if(!flight_id, !email, !candidates, !num_candidates, !total_price){
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: `All fileds requried.`,
            data: {}
        })
    }

    const sqlQuery = "insert into flight_bookings (flight_id, email, candidates, num_candidates, totel_price, booked_at, payment_at) values (?, ?, ?, ?, ?, NOW(), null);"
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
        const [booking] = await connection.execute(sqlQuery, [flight_id, email, JSON.stringify(candidates), num_candidates, total_price])
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
    const connection = await con.getConnection()
    try {
        const [booking] = await connection.execute(sql, [bookingID])
        if(booking.length > 0){
            const responce = await axios.post(`${process.env.AIRPLANE_BASE_URL}/api/flight/inc/${booking[0].num_candidates}/${booking[0].flight_id}`)

            const [result] = await connection.execute(delsql, [bookingID])
            if(result.affectedRows > 0){
                await DELconnectMq(booking[0])
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

export const showBookOrder = async (req, res) => {
    const {email} = req.params
    try {

        const sql = `select * from flight_bookings where email = ?;`;

        const [result] = await connection.execute(sql, [email])

        if(result.length > 0){
            return res.status(StatusCodes.OK).json({
                success: true,
                message: `All booking.`,
                data: {data : result}
            })
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: `No order.`,
            data: {data : []}
        })
        
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: `Internal server error`,
            data: {error}
        })
    }
}