import express from "express";
import dotenv from "dotenv";
import BookingRouter from "./routes/booking_route.js";
import Payment from "./routes/payment.js";
import cron from "node-cron";
import con from "./config/DB_connection.js";
import isLessThanFiveMinutes from "./utils/timecompere.js";
import axios from "axios";
import cookieParser from "cookie-parser"
dotenv.config();

const app = express();

const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

cron.schedule("* * * * * *", async () => {
  const sql = `SELECT * FROM flight_bookings WHERE status = 'pending';`;
  const delsql = `DELETE FROM flight_bookings WHERE id = ?;`;

  try {
    const [bookings] = await con.execute(sql);

    if (bookings.length > 0) {
      await Promise.all(
        bookings.map(async (book) => {
          const bookedTime = book.booked_at;
          const time = isLessThanFiveMinutes(new Date(bookedTime), new Date());

          if (!time) {
            try {
              const response = await axios.post(
                `${process.env.AIRPLANE_BASE_URL}/api/flight/inc/${book.num_candidates}/${book.flight_id}`
              );
              const data = await response.data;
              if (data.success === true) {
                const [delResult] = await con.execute(delsql, [book.id]);
                console.log("Delete result:", delResult);
              }
            } catch (err) {
              console.error("Error in axios or delete:", err.message);
            }
          }
        })
      );
    }
  } catch (error) {
    console.error("Cron job error:", error);
  }
});

app.use("/api/book", BookingRouter);
app.use("/api/Payment", Payment);

app.listen(PORT, async () => {
  console.log(`Booking Server running at port ${PORT}`);
  // await connectMq();
});
