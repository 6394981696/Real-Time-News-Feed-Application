import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// 📌 Dummy News Data
const news = [
  { id: 1, category: "Tech", title: "🚀 New AI Model Launched" },
  { id: 2, category: "Business", title: "📈 Stock Market Rises" },
  { id: 3, category: "Sports", title: "⚽ Football World Cup 2026 Announced" },
];

// 📌 API Route for fetching news by category
app.get("/news", (req, res) => {
  const category = req.query.category;
  if (!category) {
    return res.status(400).json({ error: "Category is required" });
  }
  const filteredNews = news.filter((n) => n.category.toLowerCase() === category.toLowerCase());
  
  if (filteredNews.length === 0) {
    return res.status(404).json({ error: "No news found for this category" });
  }

  res.json(filteredNews);
});

// 📌 WebSockets for Real-time News Updates
io.on("connection", (socket) => {
  console.log("✅ New client connected");

  socket.on("subscribe", (category) => {
    console.log(`📡 Client subscribed to ${category}`);
    const filteredNews = news.filter((n) => n.category.toLowerCase() === category.toLowerCase());
    socket.emit("news", filteredNews);
  });

  socket.on("disconnect", () => console.log("❌ Client disconnected"));
});

app.get("/", (req, res) => res.send("✅ Server is running!"));

// 📌 Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
