<script setup>
import { useDark, useToggle, useTitle } from '@vueuse/core'
const dark = useDark({
  // 这里是选择要变色的容器
  selector: 'html'
})
const toggleDark = useToggle(dark)
// 需要把.dark {background-color: #ccc;}的scoped 去掉
// 可以修改标题
useTitle(() => dark.value ? '🌙 Good evening!' : '☀️ Good morning!')
</script>

<template>
  <div color-scheme="dark">
    vueuse
  </div>
  {{ dark ? '🌙 Good evening!' : '☀️ Good morning!' }}
  <button @click="toggleDark()">转变</button>
</template>

<style>
div {
  border: 1px solid #000;
  width: 200px;
  height: 300px;
}

html.dark {
  background-color: #ccc;
}
</style>
