import { StatusCodes } from "http-status-codes"

export const  cityValidator = async (req, res, next) =>{
    try {
            if (!req.body.name) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: `City name mandatory`,
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