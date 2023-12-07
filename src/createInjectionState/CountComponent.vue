<template>
  <div>
    <ul>
      <li>count:{{ count }}</li>
      <li>double:{{ double }}</li>
    </ul>
    <button @click="incrememt()">
      +
    </button>
  </div>
</template>

<script setup>
import { useCounterStore } from '../state_store/useCounterStore'
const { count, double, incrememt } = useCounterStore()
</script>
