<template>
  <div>
    <h1>Window scroll position is {{ x }}---X---{{ y }}</h1>

  </div>
</template>

<script  setup>
import { useWindowScroll } from '@vueuse/core'

const { x, y } = useWindowScroll()
</script>
<style>
body {
  height: 800px;
  width: 800px;
}
</style>