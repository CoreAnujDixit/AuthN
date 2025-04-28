import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import dbConnect from "./config/mongoDB.js"
dotenv.config()
import userRoutes from "./routes/userRoutes.js"


//powering the app
const app = express()
//port
const PORT = process.env.PORT || 4000
//parse the json body
app.use(express.json());
//cookie parser
app.use(cookieParser());
//using cors for interaction front & backend
app.use(cors({credentials: true }))

//APi endpoints
app.get('/',(req, res)=>{
res.send("Api is Working")
})
app.use('/api/v1/auth', userRoutes)

//Calling to Connect Database
dbConnect();

//server listening
app.listen(PORT, (req, res)=>{
    console.log(`Server is listening at ${PORT}`)
})