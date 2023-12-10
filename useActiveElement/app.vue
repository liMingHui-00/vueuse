<script setup>
import { useActiveElement } from '@vueuse/core'
// 使用useActiveElement跟踪当前活动元素
const activeElement = useActiveElement()

</script>
<template>
  <div>
    <input type="text" placeholder="输入框1">
    <input type="text" placeholder="输入框2">
    <p>当前活动的元素：{{ activeElement.tagName.toLowerCase() }}{{ activeElement.placeholder }}</p>
  </div>
</template>

