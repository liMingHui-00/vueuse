<template>
  <div>
    <button @click.stop="open">选择颜色</button>
    <p v-if="color">选择的颜色：{{ color }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useEyeDropper } from '@vueuse/core'

const color = ref()
const { isSupported, open, sRGBHex } = useEyeDropper()


</script>