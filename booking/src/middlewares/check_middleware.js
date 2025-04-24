import { StatusCodes } from "http-status-codes"
import dotenv from "dotenv"
dotenv.config()

export const checkUser = async (req, res, next) => {
    try {

        const email = req.cookies.email

        if(!email){
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: `Please login.`,
                data: {}
            })
        }

        next()
        
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: `Internal server error`,
            data: {error}
        })
    }
}