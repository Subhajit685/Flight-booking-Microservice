import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config()

export const mailsand = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASS,
    },
  });