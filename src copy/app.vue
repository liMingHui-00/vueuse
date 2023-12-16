<template>
  <div>
    <button @click="openFile">打开文件</button>
    <button @click="saveFile">保存文件</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFileSystemAccess } from '@vueuse/core'

const { openFile, saveFile } = useFileSystemAccess()

const fileContent = ref('')

async function openFile() {
  const file = await openFile()
  if (file) {
    fileContent.value = await file.text()
  }
}

async function saveFile() {
  await saveFile({
    contents: fileContent.value,
    fileName: 'example.txt',
  })
}
</script>