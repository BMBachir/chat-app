const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on("send-message", (data) => {
    console.log(data);
  });
});

app.use(bodyParser.json());
app.use(cors());

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server and Socket.IO
server.listen(port, () => {
  // Use server instead of app
  console.log(`Server running on http://localhost:${port}`);
});
