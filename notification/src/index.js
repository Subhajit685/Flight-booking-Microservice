import express from "express";
import dotenv from "dotenv";
import cron from "node-cron";
import { emailSender } from "./utils/email_sender.js";
import { connectMq } from "./config/rabbitmq_config.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, async () => {
  console.log(`Booking Server running at port ${PORT}`);
  await connectMq();
});
