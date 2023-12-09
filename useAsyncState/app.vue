<script>
import { useAsyncState } from '@vueuse/core'
import axios from 'axios'
export default {
  setup() {
    // 定义一个异步函数 从中获取数据
    async function fetchData() {
      const response = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
      if (response.status !== 200) {
        throw new Error('Error fetching data')
      }
      console.log(response)
      let arrData = []
      arrData.push(response.data)
      return arrData
    }
    // 使用useAsyncState 来调用fetchData函数，并管理状态
    const { content, isLoading, error } = useAsyncState(
      // 调用fetchData 并传递初始值
      fetchData(),
      [{ content: '孔子 孟子 老子，你知道你最适合当什么子吗？', isLoading: true }],//初始值
    )
    return {
      data: content,
      isLoading, error
    }
  }
}


</script>
<template>
  <div>
    <!-- 显示加载状态 -->
    <div v-if="isLoading">Loading...</div>

    <!-- 显示错误信息 -->
    <div v-if="error">Error: {{ error.message }}</div>

    <!-- 显示获取到的数据 -->
    <div>
      <ul>
        <li v-for="item in data" :key="item.id">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

