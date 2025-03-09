import { StatusCodes } from "http-status-codes"

export const airplaneValidation = (req, res, next) => {
    try {
        if (!req.body.model_name) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: `Airplane model name mandatory`,
                data: {}
            })
        }
        if (!req.body.capacity) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: `Airplane capacity mandatory`,
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