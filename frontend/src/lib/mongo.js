import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export const dbConnect = async () => {
    console.log(mongoose.connection.readyState)
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    return mongoose.connect(MONGO_URI); 
};
