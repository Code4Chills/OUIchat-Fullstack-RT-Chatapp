import { Server } from "socket.io";
import http from "http";
import express from "express";

const app= express();
const server=http.createServer(app);
const allowedOrigins=[
    "http://localhost:5173",
    process.env.CLIENT_URL,
    process.env.FRONTEND_URL,
    process.env.RENDER_EXTERNAL_URL ? `https://${process.env.RENDER_EXTERNAL_URL}` : undefined,
].filter(Boolean);

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true,
    }
});

export function getReceiverSocketId(userId){
    return userSocketMap[userId];
}

//in order to store our online users
const userSocketMap={};

io.on("connection",(socket)=>{
    console.log("A User has connected",socket.id);

    const userId=socket.handshake.query.userId
    if(userId) userSocketMap[userId]=socket.id

    io.emit("getOnlineUsers", Object.keys(userSocketMap)) ; //send events to all connected clients

    socket.on("disconnect", ()=>{
        console.log("A user has disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export {io, app, server};
