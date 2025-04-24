import { StatusCodes } from "http-status-codes";
import con from "../config/DB_connection.js";

export const crateFlight = async (req, res) => {
  const sqlAirplaneQuery = "select * from airplane where id = ?";
  const [airplane] = await con.execute(sqlAirplaneQuery, [
    req.body.airplane_id,
  ]);

  console.log();
  try {
    let sqlQuery = `INSERT INTO flight (flight_name, departure_airport_id, arrival_airport_id, departure_time, arrival_time, price, boarding_gate, airplane_id, available_seat) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    const [flight] = await con.execute(sqlQuery, [
      req.body.flight_name,
      req.body.departure_airport_id,
      req.body.arrival_airport_id,
      req.body.departure_time,
      req.body.arrival_time,
      req.body.price,
      req.body.boarding_gate ? req.body.boarding_gate : null,
      req.body.airplane_id,
      airplane[0].capacity,
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
    f.flight_name AS flight_name, f.available_seat, f.departure_time, f.arrival_time, f.price, f.boarding_gate,
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
      length: flights.length,
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
    f.flight_name AS flight_name,f.available_seat, f.departure_time, f.arrival_time, f.price, f.boarding_gate,
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

export const filerFlight = async (req, res) => {
  console.log(req.query);
  let sqlQuery = `SELECT 
  f.id AS flight_id,
    f.flight_name AS flight_name, f.available_seat, f.departure_time, f.arrival_time, f.price, f.boarding_gate,
    departure_airport.id AS departure_airport_id, departure_airport.name AS departure_airport_name, departure_airport.code AS departure_airport_code, departure_airport.address AS departure_airport_address, departure_city.name AS departure_city_name,
    arr_airport.id AS arrival_airport_id, arr_airport.name AS arrival_airport_name, arr_airport.code AS arrival_airport_code, arr_airport.address AS arrival_airport_address, arr_city.name AS arrival_city_name,
    a.id AS airplane_id, a.model_name AS airplane_model, a.capacity AS airplane_capacity
  FROM flight f
  JOIN airport departure_airport ON f.departure_airport_id = departure_airport.id
  JOIN city departure_city ON departure_airport.city_id = departure_city.id
  JOIN airport arr_airport ON f.arrival_airport_id = arr_airport.id
  JOIN city arr_city ON arr_airport.city_id = arr_city.id
  JOIN airplane a ON f.airplane_id = a.id WHERE`;

  // travel query
  if (req.query.travel) {
    let newQuery = `departure_airport.code = '${
      req.query.travel.split("-")[0]
    }' 
                AND arr_airport.code = '${req.query.travel.split("-")[1]}'`;

    sqlQuery = sqlQuery + " " + newQuery;
  }

  // candidate query
  if (req.query.candidate) {
    let check = sqlQuery.slice(sqlQuery.length - 6, sqlQuery.length);
    const newQuery = `${check === " WHERE" ? "" : " AND"} f.available_seat >= ${
      req.query.candidate
    }`;
    sqlQuery += newQuery;
  }

  // price query
  if (req.query.price) {
    let check = sqlQuery.slice(sqlQuery.length - 6, sqlQuery.length);
    const newQuery = `${check === " WHERE" ? "" : " AND"} f.price BETWEEN ${
      req.query.price.split("-")[0]
    } AND ${req.query.price.split("-")[1]}`;
    sqlQuery += newQuery;
  }

  // date and time query
  if (req.query.date && req.query.time) {
    let check = sqlQuery.slice(sqlQuery.length - 6, sqlQuery.length);
    console.log("hi", check);
    const newQuery = `${check === " WHERE" ? "" : " AND"} f.departure_time
  BETWEEN STR_TO_DATE('${req.query.date} ${
      req.query.time.split("-")[0]
    }', '%d-%m-%Y %H:%i:%s') 
  AND STR_TO_DATE('${req.query.date} ${
      req.query.time.split("-")[1]
    }', '%d-%m-%Y %H:%i:%s')`;
    sqlQuery += newQuery;
  }

  // date query
  if (req.query.date && !req.query.time) {
    let check = sqlQuery.slice(sqlQuery.length - 6, sqlQuery.length);
    console.log("hi2", check);
    const newQuery = `${check === " WHERE" ? "" : " AND"} f.departure_time
    BETWEEN STR_TO_DATE('${req.query.date} 00:00:00', '%d-%m-%Y %H:%i:%s') 
    AND STR_TO_DATE('${req.query.date} 23:59:59', '%d-%m-%Y %H:%i:%s')`;
    sqlQuery += newQuery;
  }

  // odereBy query
  if (req.query.order) {
    const newQuery = ` ORDER BY f.price ${req.query.order}`;
    sqlQuery += newQuery;
  }

  try {
    sqlQuery += ";";
    // console.log(sqlQuery)
    let min = 0;
    let max = 0;
    const [filter] = await con.execute(sqlQuery);
    // console.log(filter)

    if (filter.length > 0) {
      filter.map((f) => {
        if (min === 0 && max === 0) {
          min = Number(f.price);
          max = Number(f.price);
        }
        if (min > Number(f.price)) {
          min = Number(f.price);
        }
        if (max < Number(f.price)) {
          max = Number(f.price);
        }
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Flight filter successfully",
      data: { filter },
      max,
      min,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Internal server error`,
      data: {},
    });
  }
};

export const seatDic = async (req, res) => {
  const { seat, flightID } = req.params;

  const sql = `update flight set available_seat = available_seat - ? where id = ?;`;
  try {
    const [result] = await con.execute(sql, [seat, flightID]);
    if (result.affectedRows > 0) {
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Update successfully",
        data: {},
      });
    }
    if (result.affectedRows === 0) {
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Flight not exites",
        data: {},
      });
    }
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Something wrong",
      data: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Internal server error`,
      data: {},
    });
  }
};

export const seatInc = async (req, res) => {
  const { seat, flightID } = req.params;

  const sql = `update flight set available_seat = available_seat + ? where id = ?;`;
  try {
    const [result] = await con.execute(sql, [seat, flightID]);
    console.log(result);
    if (result.affectedRows > 0) {
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Update successfully",
        data: {},
      });
    }
    if (result.affectedRows === 0) {
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Flight not exites",
        data: {},
      });
    }
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Something wrong",
      data: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Internal server error`,
      data: {},
    });
  }
};
