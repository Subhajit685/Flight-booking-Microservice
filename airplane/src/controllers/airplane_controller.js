import { StatusCodes } from "http-status-codes"
import con from "../config/DB_connection.js"

export const crateAirplane = async (req, res) => {
    try {
        let sqlQuery = `INSERT INTO airplane (model_name, capacity) VALUES (? ,?);`
        const [airplane] = await con.execute(sqlQuery, [req.body.model_name, req.body.capacity])
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Airplane create successfully",
            data: { airplane }
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: `Internal server error`,
            data: {}
        })
    }
}

export const getAllAirplane = async (req, res) => {
    try {
        const sqlQuery = "select * from airplane"
        const [airplanes] = await con.execute(sqlQuery)
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "All airplanes",
            data: { airplanes }
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: `Internal server error`,
            data: {}
        })
    }
}

export const getAirplaneById = async (req, res) => {
    const id = req.params?.id
    try {
        const sqlQuery = "select * from airplane where id = ?"
        const [airplane] = await con.execute(sqlQuery, [id])
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Airplane by id",
            data: { airplane }
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: `Internal server error`,
            data: {}
        })
    }
}

export const updateAirplane = async (req, res) => {
    const id = req.params.id
    if (!req.body.model_name && !req.body.capacity) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: `You need update one filde`,
            data: {}
        })
    }

    if (req.body.model_name && !req.body.capacity) {
        const sqlQuery = `UPDATE airplane 
        SET 
        model_name = ?
        WHERE id = ?;`
        try {
            const [updateAirplane] = await con.execute(sqlQuery, [req.body.model_name, id])

            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Update successfully",
                data: { updateAirplane }
            })
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: `Internal server error`,
                data: {}
            })
        }
    }
    if (!req.body.model_name && req.body.capacity) {
        const sqlQuery = `UPDATE airplane 
                        SET 
                        capacity = ?
                        WHERE id = ?;`
        try {
            const [updateAirplane] = await con.execute(sqlQuery, [req.body.capacity, id])

            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Update successfully",
                data: { updateAirplane }
            })
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: `Internal server error`,
                data: {}
            })
        }
    }
    if (req.body.model_name && req.body.capacity) {
        const sqlQuery = `UPDATE airplane 
                        SET 
                        model_name = ?,
                        capacity = ?
                        WHERE id = ?;`
        try {
            const [updateAirplane] = await con.execute(sqlQuery, [req.body.model_name, req.body.capacity, id])

            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Update successfully",
                data: { updateAirplane }
            })
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: `Internal server error`,
                data: {}
            })
        }
    }


}

export const deleteAirplane = async (req, res) =>{
    const id = req.params.id
    const sqlQuery = "DELETE FROM airplane WHERE id = ?;"

    try {
        const [airplane] = await con.execute(sqlQuery, [id])
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Deleted successfully",
            data: { airplane }
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: `Internal server error`,
            data: {}
        })
    }
}