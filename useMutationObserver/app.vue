<template>
  <div>
    <div ref="targetElement" style="width: 100px; height: 100px; background-color: lightblue;">
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMutationObserver } from '@vueuse/core'
const targetElement = ref(null)
useMutationObserver(targetElement, (mutations) => {
  if (mutations[0])
    messages.value.push(mutations[0].attributeName)
},
  {
    attributes: true
  }
)

</script>