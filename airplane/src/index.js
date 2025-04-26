import express from "express";
import dotenv from "dotenv";
import airplaneRoute from "./routes/airplane_route.js";
import cityRoute from "./routes/city_route.js";
import airportRoute from "./routes/airport_route.js";
import flightRoute from "./routes/flight_route.js";
import logger from "./utils/loger.js";
import con from "./config/DB_connection.js";
import cron from "node-cron";
import { addflightPErDay } from "./utils/addFlightPerDay.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const deleteFlight = async () => {
  const connection = await con.getConnection();
  const sqlQuery = "SELECT * FROM flight WHERE departure_time < NOW();";
  try {
    const [flight] = await connection.execute(sqlQuery);

    if (flight.length > 0) {
      flight.map(async (item) => {
        const sqlQuery = "DELETE FROM flight WHERE id = ?";
        await connection.execute(sqlQuery, [item.id]);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

cron.schedule("* * * * *", deleteFlight);
cron.schedule("01 12 * * *", addflightPErDay);

app.use("/api/airplane", airplaneRoute);
app.use("/api/city", cityRoute);
app.use("/api/airport", airportRoute);
app.use("/api/flight", flightRoute);

app.listen(PORT, () => {
  console.log(`Airplane running at port ${PORT}`);
});
