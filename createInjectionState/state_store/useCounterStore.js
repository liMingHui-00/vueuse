import { ref, computed } from "vue"
import { createInjectionState } from "@vueuse/shared"
const [useProvideCounterStore, useCounterStore] = createInjectionState(
  (initialValue) => {
    const count = ref(initialValue)

    const double = computed(() => {
      return count.value * 2
    })

    function incrememt() {
      count.value++
    }
    return { count, double, incrememt }
  }
)
//如果要隐藏“useCounterStore”并将其包装在默认值逻辑中或抛出错误逻辑，请不要导出“useCounterStore”
export { useProvideCounterStore, useCounterStore }

// 设置默认值
export function useCounterStoreWithDefaultValue() {
  return (
    useCounterStore() ?? {
      count: ref(0),
      double: ref(0),
      increment: () => {},
    }
  )
}
