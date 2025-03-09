import { StatusCodes } from "http-status-codes"
import con from "../config/DB_connection.js"

export const  airportValidator = async (req, res, next) =>{
    
    try {
            if (!req.body.name || !req.body.code || !req.body.address || !req.body.city_id) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: `Allfildes required`,
                    data: {}
                })
            }

            const sqlQuery = "select * from airport where code = ?"
            const [airport] = await con.execute(sqlQuery, [req.body.code])

            if(airport[0]){
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: `Code allready exite.`,
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