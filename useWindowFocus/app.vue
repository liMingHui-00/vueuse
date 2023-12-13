<template>
  <div>
    <h1>Window is {{ isFocused ? 'focused' : 'not focused' }}</h1>
  </div>
</template>

<script  setup>
import { useWindowFocus } from '@vueuse/core'

const isFocused = useWindowFocus()

</script>