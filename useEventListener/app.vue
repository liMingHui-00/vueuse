<template>
  <div>
    <p>鼠标位置：{{ x }}, {{ y }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useEventListener } from '@vueuse/core'

const x = ref(0)
const y = ref(0)

useEventListener(window, 'mousemove', (event) => {
  x.value = event.clientX
  y.value = event.clientY
})
</script>
