const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const port = 3000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Socket.IO events
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on("join-room", (room) => {
    if (room.trim()) {
      socket.join(room);
      console.log(`User ${socket.id} joined room: ${room}`);
    }
  });

  socket.on("send-message", (data) => {
    if (data.room && data.message.trim()) {
      io.in(data.room).emit("receive-message", data);
    }
  });
});

// Handle server errors
server.on("error", (error) => {
  console.error("Server Error:", error);
});

// Handle graceful shutdown
process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed gracefully");
    process.exit(0);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
