import { StatusCodes } from "http-status-codes"
import con from "../config/DB_connection.js"

export const crateAirport = async (req, res) => {
    const connection = await con.getConnection()
    try {
        let sqlQuery = `INSERT INTO airport (name, code, address, city_id) VALUES (?, ?, ?, ?);`
        const [airport] = await connection.execute(sqlQuery, [req.body.name, req.body.code, req.body.address, req.body.city_id])
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Airport create successfully",
            data: { airport }
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: `Internal server error`,
            data: {}
        })
    }
}

export const getAllAirport = async (req, res) => {
    const connection = await con.getConnection()
    try {
        const sqlQuery = `
        SELECT 
            airport.id AS airport_id,
            airport.name AS airport_name,
            airport.code AS airport_code,
            airport.address AS airport_address,
            city.id AS city_id,
            city.name AS city_name
        FROM airport
        JOIN city ON airport.city_id = city.id;
    `;

        const [airplanes] = await connection.execute(sqlQuery)
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "All airport",
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

export const getAirportById = async (req, res) => {
    const connection = await con.getConnection()
    const id = req.params?.id
    try {
        const sqlQuery = `SELECT 
            airport.id AS airport_id,
            airport.name AS airport_name,
            airport.code AS airport_code,
            airport.address AS airport_address,
            city.id AS city_id,
            city.name AS city_name
        FROM airport
        JOIN city ON airport.city_id = city.id where airport.id = ?`
        const [airplane] = await connection.execute(sqlQuery, [id])
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Airport by id",
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

export const updateAirport = async (req, res) => {
    const connection = await con.getConnection()
    const id = req.params.id
    if (!req.body.name && !req.body.code && !req.body.address && !req.body.city_id) {
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
            const [updateAirplane] = await connection.execute(sqlQuery, [req.body.model_name, id])

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
        const sqlQuery = `UPDATE airport 
                        SET 
                        capacity = ?
                        WHERE id = ?;`
        try {
            const [updateAirplane] = await connection.execute(sqlQuery, [req.body.capacity, id])

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
            const [updateAirplane] = await connection.execute(sqlQuery, [req.body.model_name, req.body.capacity, id])

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

export const deleteAirport = async (req, res) => {
    const connection = await con.getConnection()
    const id = req.params.id
    const sqlQuery = "DELETE FROM airport WHERE id = ?;"

    try {
        const [airplane] = await connection.execute(sqlQuery, [id])
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