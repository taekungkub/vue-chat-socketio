<template>
  <div>
    <div v-if="!isLogin">
      <input type="text" v-model="username" />
      <button @click="login()">Login</button>
    </div>

    <div v-if="isLogin">
      <div v-for="item in newMsg" :key="item">
        {{ item }}
      </div>
      <button @click="socket.connect()">Connect</button>
      <button @click="socket.disconnect()">Disconnect</button>
      {{ state }}

      <input type="text" v-model="msg" />

      <button @click="sendMsg()">Send</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { socket, state } from "../socket"

const msg = ref("")

const newMsg = ref([])
const username = ref("")
const isLogin = ref(false)

function login() {
  console.log("login")
  isLogin.value = true
}

function sendMsg() {
  socket.emit("message", msg.value)
  msg.value = ""
}

onMounted(() => {
  socket.on("message", (newMessage) => {
    newMsg.value.push(newMessage)
  })
})
</script>

<style lang="scss" scoped></style>
