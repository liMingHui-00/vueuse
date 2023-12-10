<script setup>
import { useDraggable } from '@vueuse/core'
import { ref } from 'vue'
const draggableElement = ref(null)
const { x, y, style } = useDraggable(draggableElement, { initialValue: { x: 40, y: 40 } })
// 使用useDraggable实现元素的拖拽
useDraggable(draggableElement)
</script>
<template>
  <div ref="draggableElement" class="draggable" style="width: 200px;height: 200px;background-color: aquamarine;"
    :style='style'>
    ✌拖拽我 I am at {{ x }}, {{ y }}
  </div>
</template>
<style scoped>
.draggable {
  /* 小手握紧 */
  cursor: grab;
  /* 防止拖拽时选中文本 */
  user-select: none;
  /* 使元素可以移动 */
  position: relative;
}

.draggable:active {
  /* 小手张开 */
  cursor: grabbing;
}
</style>

