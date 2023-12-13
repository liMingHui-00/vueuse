<template>
  <div>
    <button @click="sendMessage">发信息</button>
    <p>收消息: {{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useBroadcastChannel } from '@vueuse/core'

let message = ref('')
const { postMessage } = useBroadcastChannel('myChannel', (msg) => {
  message.value = msg
})
function sendMessage() {
  if (typeof postMessage === 'function') {
    postMessage('Hello from another tab!')
  } else {
    console.error('Broadcast Channel API is not supported in your browser.')
  }
}
</script>