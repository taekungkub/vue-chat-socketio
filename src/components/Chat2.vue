<template>
  <div class="wrapper">
    <div>
      <div v-if="!connected">
        <h3 class="title">What's your nickname?</h3>
        <input class="usernameInput" type="text" maxlength="14" v-model="username" />

        <button @click="onSetUsername()">Set User</button>
      </div>
    </div>

    <div class="outer_form" v-if="connected">
      <div class="inner_form">
        <div v-for="(msg, index) in messages" :key="index">
          <ChatMessage :type="msg.senderId === socketId ? 'out' : 'in'" :username="msg.username">{{ msg.message }} </ChatMessage>
        </div>
      </div>

      <div class="box_chat">
        <div class="chat">
          <input class="chat_input" type="text" v-model="msg" />
        </div>
        <div>
          <button @click="onSendMsg()">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { socket, state } from "../socket"
import ChatMessage from "./ChatMessage.vue"
import { v4 as uuidv4 } from "uuid"

const username = ref("")
const msg = ref("")
let message = ref("")

const connected = ref(false)
const numberOfUser = ref(0)
const socketId = ref(uuidv4())

const messages = ref([])

function onSetUsername() {
  if (!username) {
    return
  }
  socket.emit("add user", username.value)
}

function onSendMsg() {
  socket.emit("new message", {
    body: msg.value,
    senderId: socketId.value,
  })
  msg.value = ""
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
  socket.emit("load user")

  socket.on("load user", (num) => {
    numberOfUser.value = num
  })

  socket.on("user left", (data) => {
    addParticipantsMessage(data)
  })

  socket.on("login", (data) => {
    connected.value = true
  })

  socket.on("new message", (newMsg) => {
    messages.value.push(newMsg)
  })

  socket.on("disconnect", () => {
    console.log("you have bees disconnect")
  })
})
</script>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  padding: 12px;
  max-width: 700px;
  margin: 0 auto;
}

.outer_form {
  padding: 12px;
  border: 1px solid blue;
  width: 100%;
}

.inner_form {
  border: 1px solid blue;
  width: 100%;
  min-height: 250px;
  overflow-y: auto;
  max-height: 300px;
}

.box_chat {
  display: flex;
  gap: 12px;
  align-items: center;
}

.chat {
  flex: 1;
  height: 100%;
  margin-top: 12px;
}

.chat_input {
  width: 100%;
  height: 30px;

  border: 1px solid blue;
}

.box_chat button {
  margin-top: 10px;
}
</style>
