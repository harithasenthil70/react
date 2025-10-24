const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Enable Socket.io with CORS (Frontend runs at http://localhost:3000)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// When client connects
io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  // Send welcome notification
  socket.emit("notification", {
    message: "🎉 Welcome! You are connected to the Realtime Notification Server!"
  });

  // When client disconnects
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});