<template>
  <div>
    <button @click="changeFavicon">更改图标</button>
  </div>
</template>

<script setup>
import { useFavicon } from '@vueuse/core'

const changeFavicon = useFavicon('/path/to/new/favicon.ico')
</script>
