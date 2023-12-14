<template>
  <div>
    <p>当前颜色: {{ color }}</p>
    <button @click="changeColor">改变颜色</button>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useCssVar } from '@vueuse/core'
const color = ref('black')
useCssVar(color)
function changeColor() {
  color.value = color.value === 'black' ? 'red' : 'black'
}
</script>

<style scoped>
div {

  --color: black;
  color: var(--color);
}
</style>