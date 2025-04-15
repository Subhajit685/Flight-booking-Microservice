import express from 'express';
import dotenv from "dotenv"
import airplaneRoute from "./routes/airplane_route.js"
import cityRoute from "./routes/city_route.js"
import airportRoute from "./routes/airport_route.js"
import flightRoute from "./routes/flight_route.js"
import logger from "./utils/loger.js"
import con from "./config/DB_connection.js"
import cron from "node-cron";
import { addflightPErDay } from './utils/addFlightPerDay.js';
dotenv.config()

const app = express()

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
    logger.info(`${req.method} : ${req.protocol} : ${req.hostname} : ${req.url} : ${req.ip}`)
    next()
})

const deleteFlight = async() => {
    const sqlQuery = "SELECT * FROM flight WHERE departure_time < NOW();"
    try {
        const [flight] = await con.execute(sqlQuery)

        if(flight.length > 0){
            flight.map(async(item)=>{
                const sqlQuery = "DELETE FROM flight WHERE id = ?"
                await con.execute(sqlQuery, [item.id])
            })
        }
    } catch (error) {
        console.log(error)
    }
    
}
  
cron.schedule("* * * * *", deleteFlight)
cron.schedule("30 9 * * *", addflightPErDay)


app.use("/api/airplane", airplaneRoute)
app.use("/api/city", cityRoute)
app.use("/api/airport", airportRoute)
app.use("/api/flight", flightRoute)


app.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`)
})