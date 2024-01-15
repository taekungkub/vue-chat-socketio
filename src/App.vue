<template>
  <!-- <Chat /> -->
  <LayoutChat2>
    <Chat2 />
  </LayoutChat2>
</template>

<script setup>
import Chat from "./components/Chat.vue"
import { ref, onMounted } from "vue"

import { socket } from "./socket"
import Chat2 from "./components/Chat2.vue"
import LayoutChat2 from "./components/LayoutChat2.vue"

socket.connect()
</script>

<style scoped></style>
