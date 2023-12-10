<template>
  <div ref="myDiv" class="div">我是一个元素</div>
  <p v-if="isVisible">元素在视口中可见</p>
  <p v-else>元素在视口中不可见</p>
</template>

<script setup>
import { ref } from 'vue'
import { useElementVisibility } from '@vueuse/core'
const myDiv = ref(null)
// 使用useElementVisibility检测元素是否在窗口可见
const isVisible = useElementVisibility(myDiv)
</script>

<style>
body {
  height: 5000px;
}

.div {
  width: 200px;
  height: 200px;
  background-color: lightblue;

}
</style>