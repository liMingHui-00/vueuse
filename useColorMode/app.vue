<template>
  <div :class="colorMode">
    <p>当前模式: {{ colorMode }}</p>
    <button @click="toggleColorMode">切换</button>
  </div>
</template>

<script setup>
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()
function toggleColorMode(c) {
  if (colorMode.value === 'dark') {
    colorMode.value = 'light'
  } else {
    colorMode.value = 'dark'
  }

}
console.log(colorMode);

</script>

<style scoped>
.light {
  background-color: white;
  color: black;
}

.dark {
  background-color: black;
  color: white;
}
</style>