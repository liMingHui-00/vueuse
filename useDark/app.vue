<template>
  <div :class="{ dark: isDark.value }">
    <p>当前模式：{{ isDark.value ? '深色' : '浅色' }}</p>
    <button @click="toggleDarkMode">切换模式</button>
  </div>
</template>

<script setup>
import { useDark } from '@vueuse/core'

const isDark = useDark()

function toggleDarkMode() {
  isDark.value = !isDark.value
}
</script>

<style scoped>
div {
  background-color: white;
  color: black;
  transition: background-color 0.3s, color 0.3s;
}

div.dark {
  background-color: black;
  color: white;
}
</style>