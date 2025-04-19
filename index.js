import express from "express"
import dotenv from "dotenv"
dotenv.config();
import db from "./utils/db.js"
//import routers
import UserRoutes from "./routes/user.route.js"


const app = express()
const PORT = 3000 || process.env.MONGO_URL
app.use(express.json()); // 🛠️ This is MUST to parse JSON body


db(); //Connect to DB

//userRoutes
app.use("/api/v1/users", UserRoutes)


app.listen(PORT,(req, res)=>{
console.log(`Running of ${PORT}`)
})