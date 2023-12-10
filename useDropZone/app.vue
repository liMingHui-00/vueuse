<template>
  <div ref="dropZoneElement" class="drop-zone">
    拖放文件到这里
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDropZone } from '@vueuse/core'

const dropZoneElement = ref(null)

// 使用 useDropZone 创建一个拖放区域
const dropZone = useDropZone(dropZoneElement, dropZoneFn)

function dropZoneFn(e) {
  console.log('Dropped files:', e.dataTransfer.files)
}

</script>

<style>
.drop-zone {
  width: 200px;
  height: 200px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>