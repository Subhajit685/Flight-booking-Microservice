import { StatusCodes } from "http-status-codes"
import con from "../config/DB_connection.js"

export const crateCity = async (req, res) => {
    try {
        let sqlQuery = `INSERT INTO city (name) VALUES (?);`
        const [city] = await con.execute(sqlQuery, [req.body.name])
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "City create successfully",
            data: { city }
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: `Internal server error`,
            data: {}
        })
    }
}

export const getAllCitys = async (req, res) => {
    try {
        const sqlQuery = "select * from city"
        const [citys] = await con.execute(sqlQuery)
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "All citys",
            data: { citys }
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: `Internal server error`,
            data: {}
        })
    }
}

export const getCityById = async (req, res) => {
    const id = req.params?.id
    try {
        const sqlQuery = "select * from city where id = ?"
        const [city] = await con.execute(sqlQuery, [id])
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "City by id",
            data: { city }
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: `Internal server error`,
            data: {}
        })
    }
}

export const updateCity = async (req, res) => {
    const id = req.params.id
    if (!req.body.name) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: `You need update one filde`,
            data: {}
        })
    }

    if (req.body.name) {
        const sqlQuery = `UPDATE city 
        SET 
        name = ?
        WHERE id = ?;`
        try {
            const [updateCity] = await con.execute(sqlQuery, [req.body.name, id])

            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Update successfully",
                data: { updateCity }
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

export const deleteCity = async (req, res) => {
    const id = req.params.id
    const sqlQuery = "DELETE FROM city WHERE id = ?;"

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