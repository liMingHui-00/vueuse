<script setup>
import { useProvideCounterStore } from './state_store/useCounterStore'
// import Son from './createInjectionState/Son.vue'
import CountComponent from './createInjectionState/CountComponent.vue'
useProvideCounterStore(0)
</script>
<template>
  <div>
    <!-- <Son></Son> -->
    <CountComponent></CountComponent>
  </div>
</template>
<style scoped>
div {
  border: 1px solid #000;
  box-shadow: 0 0 10px;
  border-radius: 10px;
}
</style>
