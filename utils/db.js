import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();


//lets make a function here

const db = ()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>[
    console.log("DB is Connected")
    ])
    .catch((error)=>{
    console.log("error is occuring", error.message)
    })
}

export default db;

