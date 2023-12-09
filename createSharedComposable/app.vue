<script setup>
import useSharedTheme from './state_store/createSharedComposable'
const { theme, toggleTheme } = useSharedTheme()
</script>
<template>
  <h3>createSharedComposable</h3>
  <div :class="theme">
    当前主题是：{{ theme }}</div>
  <button @click="toggleTheme">切换主题</button>
</template>
<style scoped>
div {
  border: 1px solid #000;
  box-shadow: 0 0 10px;
  border-radius: 10px;
}

div .light {
  background-color: aliceblue;
}

div .dark {
  background-color: #888;
}
</style>
