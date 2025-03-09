import express from 'express';
import dotenv from "dotenv"
import airplaneRoute from "./routes/airplane_route.js"
import cityRoute from "./routes/city_route.js"
import airportRoute from "./routes/airport_route.js"
import flightRoute from "./routes/flight_route.js"
dotenv.config()

const app = express()

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use("/api/airplane", airplaneRoute)
app.use("/api/city", cityRoute)
app.use("/api/airport", airportRoute)
app.use("/api/flight", flightRoute)


app.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`)
})