<template>
  <div>
    <button @click="openFileDialog">打开文件</button>
    <p v-if="file.value">选择的文件：{{ file.value.name }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFileDialog } from '@vueuse/core'

const file = ref(null)
const openFileDialog = useFileDialog((files) => {
  if (files.length > 0) {
    file.value = files[0]
  }
})
</script>