import mongoose from "mongoose";

export const connectDB= async()=>{
    try{
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not set");
        }

        const conn= await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`) ;   
    } catch (error){
        console.error("mongoDB connection error:", error.message);
        throw error;
    }
};
