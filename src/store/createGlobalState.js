import { computed, ref } from "vue"
import { createGlobalState, useStorage } from "@vueuse/core"

export const useGlobalState = createGlobalState(() => {
  // state
  const count = ref(0)

  // getters
  const doubleCount = computed(() => count.value * 2)

  // actions
  function increment() {
    count.value++
  }
  const msg = useStorage("key", "我是持久化的数据")
  return { count, doubleCount, increment, msg }
})
