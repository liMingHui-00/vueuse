<template>
  <div>
    <h1 v-if="breakpoints.xs">超小屏幕</h1>
    <h1 v-else-if="breakpoints.sm">小屏幕</h1>
    <h1 v-else-if="breakpoints.md">中屏幕</h1>
    <h1 v-else-if="breakpoints.lg">大屏幕</h1>
    <h1 v-else>超大屏幕</h1>
  </div>
</template>

<script setup>
import { useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints({
  xs: '(max-width: 576px)',
  sm: '(max-width: 768px)',
  md: '(max-width: 992px)',
  lg: '(max-width: 1200px)',
})
</script>
