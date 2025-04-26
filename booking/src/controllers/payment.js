import con from "../config/DB_connection.js";
import { connectMq } from "../config/rabbit_mp.js";
import isLessThanFiveMinutes from "../utils/timecompere.js";
import { StatusCodes } from "http-status-codes";

export const payment = async (req, res) => {
  const bookingId = req.params.bookingid;
  const connection = await con.getConnection()

  const sqlQuery = "select * from flight_bookings where id = ?;";

  try {
    const [bookedFlight] = await connection.execute(sqlQuery, [bookingId]);
    const bookedTime = bookedFlight[0].booked_at;

    const time = isLessThanFiveMinutes(
      new Date(bookedTime),
      new Date(Date.now())
    );

    if (time) {
      const sql = `update flight_bookings set status = 'confirmed', payment_at = NOW() where id = ?;`;
      const [result] = await connection.execute(sql, [bookingId]);
      if (result.affectedRows > 0) {
        await connectMq(bookedFlight[0]);
        return res.status(StatusCodes.OK).json({
          success: true,
          message: `Payment complete successfully.`,
          data: {},
        });
      }
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: `Something wrong. Please try again.`,
        data: {},
      });
    }
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: `Time out. Please try again.`,
      data: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Internal server error`,
      data: {"errer is": error },
    });
  }
};
