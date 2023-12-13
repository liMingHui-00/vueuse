<template>
  <div>
    <input type="text" v-model="textToCopy" placeholder="Enter text to copy" />
    <button @click="copyToClipboard">Copy to Clipboard</button>
    <p v-if="isCopyed"> {{ textToCopy }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'
let isCopyed = ref(false)

const textToCopy = ref('')
const { copy } = useClipboard()

function copyToClipboard() {
  isCopyed.value = !isCopyed.value
  copy(textToCopy.value)
}
</script>