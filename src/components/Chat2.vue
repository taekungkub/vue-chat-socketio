<template>
  <div>
    number user {{ numberOfUser }}
    <div v-if="!connected">
      <div>
        <h3 class="title">What's your nickname?</h3>
        <input class="usernameInput" type="text" maxlength="14" v-model="username" />

        <button @click="onSetUsername()">Set User</button>
      </div>
    </div>

    <div v-if="connected">
      <input type="text" v-model="msg" />
      <button @click="onSendMsg()">Send</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { socket, state } from "../socket"

const username = ref("")
const msg = ref("")
let message = ref("")

const connected = ref(false)
const numberOfUser = ref(0)

function onSetUsername() {
  socket.emit("add user", username.value)
}

function onSendMsg() {
  socket.emit("new message", msg.value)
}

const addParticipantsMessage = (data) => {
  if (data.numUsers === 1) {
    message.value += `there's 1 participant`
  } else {
    message.value += `there are ${data.numUsers} participants`
  }

  numberOfUser.value = data.numUsers
}

onMounted(() => {
  // Whenever the server emits 'user joined', log it in the chat body

  socket.emit("load user")

  socket.on("load user", (num) => {
    numberOfUser.value = num
  })

  socket.on("user joined", (data) => {
    console.log(data)
    addParticipantsMessage(data)
  })

  // Whenever the server emits 'user left', log it in the chat body
  socket.on("user left", (data) => {
    addParticipantsMessage(data)
  })

  socket.on("new message", (data) => {
    addChatMessage(data)
  })

  // Whenever the server emits 'login', log the login message
  socket.on("login", (data) => {
    connected.value = true
    // Display the welcome message
    const message = "Welcome to Socket.IO Chat – "
  })

  socket.on("disconnect", () => {
    console.log("you have bees disconnect")
  })
})
</script>

<style scoped></style>
