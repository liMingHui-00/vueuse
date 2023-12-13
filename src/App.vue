<template>
  <div>
    <h3>{{ size }}</h3>
  </div>
</template>

<script  setup>
import { useWindowSize } from '@vueuse/core'
const size = useWindowSize()
</script>
