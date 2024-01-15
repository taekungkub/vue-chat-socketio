<script setup>
import { defineProps } from "vue"

const props = defineProps({
  type: String,
  username: String,
})
</script>

<template>
  <div class="wrap">
    <span v-if="type === 'in'">
      {{ username }}
    </span>
    <div class="msg" :class="type"><slot /></div>
    <div v-if="type === 'out'">
      {{ username }}
    </div>
  </div>
</template>

<style scoped>
.wrap {
  display: flex;
  padding: 12px;
  align-items: center;
  gap: 5px;
}
.msg {
  border-radius: 50px;
  padding: 5px 10px;
  color: #fff;
  margin-bottom: 5px;
}

.in {
  background: #4caf50;
}
.out {
  background: #2196f3;
  margin-left: auto;
}
</style>
