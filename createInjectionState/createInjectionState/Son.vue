<script setup>
import { useCounterStore } from '../state_store/useCounterStore'

const conuterStore = useCounterStore()

</script>

<template>
  <div class="son bg-green-400">
    <div>这是一个子组件</div>
    <div>count:{{ conuterStore.count }}，double:{{ conuterStore.double }}</div>
    <button @click="conuterStore.incrememt">changeState</button>
  </div>
</template>

