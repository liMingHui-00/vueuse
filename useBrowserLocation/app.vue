<template>
  <div>
    <p>地址 ：{{ location.href }}</p>
  </div>
</template>

<script setup>
import { useBrowserLocation } from '@vueuse/core'

const location = useBrowserLocation()
console.log(location)
</script>