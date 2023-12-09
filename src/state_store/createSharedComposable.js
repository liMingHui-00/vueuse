import { ref } from "vue"
import { createSharedComposable } from "@vueuse/core"

// 创建一个可以全局共享的响应式状态
const useSharedTheme = createSharedComposable(() => {
  const theme = ref("light") // 默认主题是 'light'

  // 切换主题的函数
  function toggleTheme() {
    theme.value = theme.value === "light" ? "dark" : "light"
  }

  return { theme, toggleTheme }
})

export default useSharedTheme
