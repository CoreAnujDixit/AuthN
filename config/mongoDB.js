import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("MongoDB connected successfully");
        })
        .catch((error) => {
            console.error("MongoDB connection error:", error);
        });
};

export default connectDB;
