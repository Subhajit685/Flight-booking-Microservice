import express from 'express';
import dotenv from "dotenv"
dotenv.config()

const app = express()

const PORT = process.env.PORT || 4001

app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`)
})