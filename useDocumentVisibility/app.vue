<script setup>
import { useDocumentVisibility } from '@vueuse/core'
// 使用 useDocumentVisibility 跟踪文档的可见性状态
const visibility = useDocumentVisibility()
console.log(visibility.value)
</script>
<template>
  <div>
    <p>文档的可见性状态：{{ visibility }}</p>
  </div>
</template>

