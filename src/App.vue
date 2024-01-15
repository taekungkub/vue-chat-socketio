<template>
  <!-- <Chat /> -->
  <Chat2 />
</template>

<script setup>
import Chat from "./components/Chat.vue"
import { ref, onMounted } from "vue"

import { socket } from "./socket"
import Chat2 from "./components/Chat2.vue"

socket.connect()
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
