<template>
  <div class="wrapper">
    <div class="sidebar">
      <div class="inner_sidebar">
        <div v-for="(item, index) in users" :key="index" class="item">
          {{ item.username }}
        </div>
      </div>
    </div>

    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { socket, state } from "../socket"

const users = ref([])

onMounted(() => {
  socket.on("user joined", (data) => {
    console.log(data)

    users.value.push(data)
  })
})
</script>

<style scoped>
.wrapper {
  position: relative;
  display: flex;
}
.sidebar {
  width: 300px;
  border: 1px solid blue;
  height: 100vh;
}

.inner_sidebar {
  padding: 12px;
}

.item {
  border: 1px solid black;
  padding: 7px;
  cursor: pointer;
  margin-top: 12px;
}
.badge {
  width: 25px;
  height: 25px;
  color: green;
  border-radius: 100%;
}
</style>
