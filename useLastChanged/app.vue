<script setup>
import { ref } from 'vue'
import { useLastChanged } from '@vueuse/core'
// 创建一个响应式引用
const count = ref(0)
// 使用 useLastChanged 跟踪 count 的最后一次改变
const lastChanged = useLastChanged(count)
// 创建一个函数，用于改变 count 的值
function increment() {
  count.value++
}
</script>
<template>
  <div>
    <button @click="increment">增加</button>
    <p>当前值：{{ count }}</p>
    <p>时间戳：{{ lastChanged }}</p>
    <p>最后一次改变：{{ new Date(lastChanged) }}</p>
  </div>
</template>

