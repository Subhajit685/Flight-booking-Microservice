import express from "express";
import proxy from "express-http-proxy";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./loger.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use((req, res, next) => {
  logger.info(
    `${req.method} : ${req.protocol} : ${req.hostname} : ${req.url} : ${req.ip}`
  );
  next();
});

app.use(
  "/airplane",
  proxy(process.env.AIRPLANE_BASE_URL, {
    proxyErrorHandler: (err, res, next) => {
      console.error("Proxy Error (Air plane Service):", err);
      next(err);
    },
  })
);

app.use(
  "/book",
  proxy(process.env.BOOKING_BASE_URL, {
    proxyErrorHandler: (err, res, next) => {
      console.error("Proxy Error (Booking Service):", err);
      next(err);
    },
  })
);
app.use(
  "/user",
  proxy(process.env.USER_BASE_URL, {
    proxyErrorHandler: (err, res, next) => {
      console.error("User Error (Air plane Service):", err);
      next(err);
    },
  })
);

app.listen(port, () => {
  console.log(`Server listen at ${port}`);
});
