const express = require("express")
const { createServer } = require("node:http")
var cors = require("cors")
const { Server } = require("socket.io")

const app = express()
const server = createServer(app)

app.use(cors())

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
})

io.on("connection", (socket) => {
  console.log("a user connected")
  socket.on("disconnect", () => {
    console.log("user disconnect")
  })

  socket.on("message", (msg) => {
    io.emit("message", msg)
  })
})

server.listen(3000, () => {
  console.log("server running at http://localhost:3000")
})
