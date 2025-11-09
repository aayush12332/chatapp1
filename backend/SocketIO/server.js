import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO server with correct CORS
const io = new Server(server, {
  cors: {
    origin: "https://chatapp1-kq72.onrender.com", // ✅ your final deployed URL
    methods: ["GET", "POST"],
  },
});

const users = {}; // store online users with socket.id

// export function to get receiver socket id
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

// Socket.IO server events
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  const userId = socket.handshake.query.userId;

  // If userId is provided, save socket id
  if (userId) {
    users[userId] = socket.id;
    console.log("✅ Online Users:", users);
  }

  // Send updated online users list
  io.emit("getOnlineUsers", Object.keys(users));

  // User disconnect event
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

export { app, io, server };
