import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors" ;

import path from "path";

import {connectDB} from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import {app, server} from "./lib/socket.js"


const PORT=process.env.PORT || 5001;
const __dirname=path.resolve();
const allowedOrigins=[
    "http://localhost:5173",
    process.env.CLIENT_URL,
    process.env.FRONTEND_URL,
    process.env.RENDER_EXTERNAL_URL ? `https://${process.env.RENDER_EXTERNAL_URL}` : undefined,
].filter(Boolean);

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
    origin: allowedOrigins,
    credentials: true,
})
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("/{*any}", (req, res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

const startServer=async()=>{
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not set");
        }

        await connectDB();

        server.listen(PORT, ()=>{
            console.log("server is running on port "+ PORT);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();
