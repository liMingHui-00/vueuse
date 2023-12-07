<script setup>
import { useGlobalState } from './store/createGlobalState'
const globalState = useGlobalState()
</script>
<template>
  <div>
    <h3>vueuse</h3>
    <ul>
      <li>我不是持久化的数据</li>
      <br>
      <li>{{ globalState }}</li>
      <hr>
      <br>
      <li>持久化数据，是在local storage</li>
      <br>
      <li>{{ globalState.msg }}</li>
    </ul>
    <button @click="globalState.increment()">修改count的值</button>
  </div>
</template>
<style scoped>
div {
  border: 1px solid #000;
  box-shadow: 0 0 10px;
  border-radius: 10px;
}
</style>
