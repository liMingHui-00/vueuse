<script setup>
import { useMouse } from '@vueuse/core'
const { x, y } = useMouse()
const mouse = useMouse()
</script>

<template>
  <div>
    vueuse
    <ul>
      <li>x:{{ x }}</li>
      <li>y:{{ y }}</li>
      <li>mouse:{{ mouse }}</li>
    </ul>
  </div>
</template>

<style scoped></style>
