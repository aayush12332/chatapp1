import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

dotenv.config();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

// Fix __dirname
const __dirname = path.resolve();

// ✅ Connect to MongoDB
mongoose
  .connect(mongodb+srv://aayushsurpatidar100_db_user:uhQugGd5HYzLNgP5@cluster0.1nmdbkq.mongodb.net/)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log(err));

// ✅ API Routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// ✅ Correct path to Vite build folder ("dist")
const buildPath = path.join(__dirname, "frontend", "dist");

// ✅ Serve static files from dist
app.use(express.static(buildPath));

// ✅ React Router fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// ✅ Start Server
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
