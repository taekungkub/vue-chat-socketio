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

let numUsers = 0

io.on("connection", (socket) => {
  let addedUser = false

  socket.on("load user", () => {
    socket.emit("load user", numUsers)
  })

  socket.on("disconnect", () => {
    console.log("user disconnect")
  })

  // when the client emits 'new message', this listens and executes
  socket.on("new message", (data) => {
    // we tell the client to execute 'new message'
    socket.emit("new message", {
      username: socket.username,
      message: data,
    })
  })

  socket.on("add user", (username) => {
    // we store the username in the socket session for this client
    socket.username = username

    ++numUsers

    addedUser = true
    socket.emit("login", {
      numUsers: numUsers,
    })
    // echo globally (all clients) that a person has connected
    socket.emit("user joined", {
      username: socket.username,
      numUsers: numUsers,
    })
  })

  socket.on("disconnect", () => {
    if (addedUser) {
      --numUsers

      socket.emit("user left", {
        username: socket.username,
        numUsers: numUsers,
      })
    }
  })
})

server.listen(3000, () => {
  console.log("server running at http://localhost:3000")
})
