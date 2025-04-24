import express from "express";
import dotenv from "dotenv";
import Userrouter from "./routes/user_route.js"
import cookiepparser from "cookie-parser"
dotenv.config();

const app = express();

const PORT = process.env.PORT || 4004;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiepparser())

app.use("/api/user", Userrouter)

app.listen(PORT, async () => {
  console.log(`User Server running at port ${PORT}`);
});
