<script setup>
import { ref } from 'vue'
import { useManualRefHistory } from '@vueuse/core'
// 创建一个响应式引用
const count = ref(0)

// 使用 useManualRefHistory 跟踪 count 的历史记录
const { commit, history } = useManualRefHistory(count)

// 创建一个函数，用于改变 count 的值并记录历史
function increment() {
  count.value++
  commit() // 手动触发记录历史
  console.log(history.value)
}

</script>
<template>
  <div>
    <button @click="increment">增加</button>
    <p>当前值：{{ count }}</p>
    <h3>历史记录：</h3>
    <ul>
      <li v-for="(entry, index) in history.value" :key="index">
        {{ entry }}
      </li>
    </ul>
  </div>
</template>

