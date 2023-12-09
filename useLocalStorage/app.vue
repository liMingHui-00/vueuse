<script setup>
import { useLocalStorage } from '@vueuse/core'
const count = useLocalStorage('count', 0)
function increment() {
  count.value++
}
</script>
<template>
  <div>
    <button @click="increment">增加</button>
    <p>当前值：{{ count }}</p>
  </div>
</template>

