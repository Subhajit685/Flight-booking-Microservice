import { StatusCodes } from "http-status-codes";
import con from "../config/DB_connection.js";

export const crateFlight = async (req, res) => {
  try {
    let sqlQuery = `INSERT INTO flight (flight_name, departure_airport_id, arrival_airport_id, departure_time, arrival_time, price, boarding_gate, airplane_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
    const [flight] = await con.execute(sqlQuery, [
      req.body.flight_name,
      req.body.departure_airport_id,
      req.body.arrival_airport_id,
      req.body.departure_time,
      req.body.arrival_time,
      req.body.price,
      req.body.boarding_gate ? req.body.boarding_gate : null,
      req.body.airplane_id,
    ]);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Flight create successfully",
      data: { flight },
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Internal server error`,
      data: {},
    });
  }
};

export const getAllFlight = async (req, res) => {
  try {
    const sqlQuery = `SELECT 
    f.id AS flight_id,
    f.flight_name AS flight_name, f.departure_time, f.arrival_time, f.price, f.boarding_gate,
    departure_airport.id AS departure_airport_id, departure_airport.name AS departure_airport_name, departure_airport.code AS departure_airport_code, departure_airport.address AS departure_airport_address, departure_city.name AS departure_city_name,
    arr_airport.id AS arrival_airport_id, arr_airport.name AS arrival_airport_name, arr_airport.code AS arrival_airport_code, arr_airport.address AS arrival_airport_address, arr_city.name AS arrival_city_name,
    a.id AS airplane_id, a.model_name AS airplane_model, a.capacity AS airplane_capacity
    FROM flight f
    JOIN airport departure_airport ON f.departure_airport_id = departure_airport.id
    JOIN city departure_city ON departure_airport.city_id = departure_city.id
    JOIN airport arr_airport ON f.arrival_airport_id = arr_airport.id
    JOIN city arr_city ON arr_airport.city_id = arr_city.id
    JOIN airplane a ON f.airplane_id = a.id;`;

    const [flights] = await con.execute(sqlQuery);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "All flights",
      data: { flights },
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Internal server error`,
      data: {},
    });
  }
};

export const getFlightById = async (req, res) => {
  const id = req.params?.id;
  try {
    const sqlQuery = `SELECT 
    f.id AS flight_id,
    f.flight_name AS flight_name, f.departure_time, f.arrival_time, f.price, f.boarding_gate,
    departure_airport.id AS departure_airport_id, departure_airport.name AS departure_airport_name, departure_airport.code AS departure_airport_code, departure_airport.address AS departure_airport_address, departure_city.name AS departure_city_name,
    arr_airport.id AS arrival_airport_id, arr_airport.name AS arrival_airport_name, arr_airport.code AS arrival_airport_code, arr_airport.address AS arrival_airport_address, arr_city.name AS arrival_city_name,
    a.id AS airplane_id, a.model_name AS airplane_model, a.capacity AS airplane_capacity
    FROM flight f
    JOIN airport departure_airport ON f.departure_airport_id = departure_airport.id
    JOIN city departure_city ON departure_airport.city_id = departure_city.id
    JOIN airport arr_airport ON f.arrival_airport_id = arr_airport.id
    JOIN city arr_city ON arr_airport.city_id = arr_city.id
    JOIN airplane a ON f.airplane_id = a.id where f.id = ?`;
    const [flight] = await con.execute(sqlQuery, [id]);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Flight by id",
      data: { flight },
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Internal server error`,
      data: {},
    });
  }
};

export const updateFlight = async (req, res) => {
  const id = req.params.id;
  if (
    !req.body.name &&
    !req.body.code &&
    !req.body.address &&
    !req.body.city_id
  ) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: `You need update one filde`,
      data: {},
    });
  }

  if (req.body.model_name && !req.body.capacity) {
    const sqlQuery = `UPDATE airplane 
        SET 
        model_name = ?
        WHERE id = ?;`;
    try {
      const [updateAirplane] = await con.execute(sqlQuery, [
        req.body.model_name,
        id,
      ]);

      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Update successfully",
        data: { updateAirplane },
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `Internal server error`,
        data: {},
      });
    }
  }
  if (!req.body.model_name && req.body.capacity) {
    const sqlQuery = `UPDATE airport 
                        SET 
                        capacity = ?
                        WHERE id = ?;`;
    try {
      const [updateAirplane] = await con.execute(sqlQuery, [
        req.body.capacity,
        id,
      ]);

      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Update successfully",
        data: { updateAirplane },
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `Internal server error`,
        data: {},
      });
    }
  }
  if (req.body.model_name && req.body.capacity) {
    const sqlQuery = `UPDATE airplane 
                        SET 
                        model_name = ?,
                        capacity = ?
                        WHERE id = ?;`;
    try {
      const [updateAirplane] = await con.execute(sqlQuery, [
        req.body.model_name,
        req.body.capacity,
        id,
      ]);

      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Update successfully",
        data: { updateAirplane },
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `Internal server error`,
        data: {},
      });
    }
  }
};

export const deleteFlight = async (req, res) => {
  const id = req.params.id;
  const sqlQuery = "DELETE FROM flight WHERE id = ?;";

  try {
    const [flight] = await con.execute(sqlQuery, [id]);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Deleted successfully",
      data: { flight },
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Internal server error`,
      data: {},
    });
  }
};
