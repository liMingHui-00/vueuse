# vueuse

## state

### useMouse

这个是用来获取鼠标的坐标

### useDark

这个是用来设置页面的白天与夜晚

### createGlobalState

这个是将数据保存全局作用域中，以便跨Vue实例复用。

### createInjectionState

创建可以注入到组件中的全局状态。

### vueuse中createGlobalState 和createInjectionState的使用场景有什么区别？

在VueUse 中，`createGlobalState `和`createInjectionState `是两个用于状态管理的函数，用于在Vue .js 中创建全局状态和注入状态。

1.`createGlobalState `: -适用场景：用于创建全局的共享状态。 -特点： -创建的状态是全局的，可以在应用的任何地方使用。 -状态在组件之间共享，一个组件对状态的修改会影响其他使用该状态的组件。 -可以使用VueCompositionAPI 中的`provide `和`inject `配合使用来传递和使用全局状态。
2.`createInjectionState `: -适用场景：用于创建局部的注入状态。 -特点： -创建的状态是局部的，只能在特定的组件树范围内使用。 -注入状态可以在父组件提供，并通过VueCompositionAPI 中的`provide `和`inject `传递给子组件。 -子组件可以通过注入状态来访问其值。

总结： -`createGlobalState `用于创建全局状态，适用于需要在整个应用中共享状态的场景。

​			 -`createInjectionState `用于创建局部的注入状态，在局部组件树中共享状态的场景。

### createSharedComposable

`createSharedComposable` 是 VueUse 库中的一个函数，用于创建一个可共享的 composable 函数，这样就可以在多个组件间共享同一个响应式状态，而不会每次调用时都创建一个新的状态。这在需要跨组件共享状态时非常有用，例如用户的偏好设置、主题信息或者任何其他需要在组件间共享的数据。

VueUse 自 4.x 版本之后已经不再包含 `createSharedComposable` 函数。取而代之的是使用 `useSharedState` 或者 `createGlobalState`。不过，为了回答你的问题，我将提供一个类似于 `createSharedComposable` 的行为的例子，使用 `createGlobalState`。

假设我们想创建一个共享的主题状态，可以这样做：

```javascript
import { ref } from 'vue';
import { createGlobalState } from '@vueuse/core';

// 创建一个可以全局共享的响应式状态
const useSharedTheme = createGlobalState(() => {
  const theme = ref('light'); // 默认主题是 'light'
  
  // 切换主题的函数
  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  }

  return { theme, toggleTheme };
});

export default useSharedTheme;
```

然后你可以在任何组件中这样使用它：

```javascript
import useSharedTheme from './path-to-useSharedTheme';

export default {
  setup() {
    const { theme, toggleTheme } = useSharedTheme();

    return {
      theme,
      toggleTheme,
    };
  },
};
```

在模板中，你可以这样使用：

```html
<template>
  <div :class="theme">
    当前主题是：{{ theme }}
    <button @click="toggleTheme">切换主题</button>
  </div>
</template>
```

由于 `useSharedTheme` 使用 `createGlobalState` 创建，无论在哪个组件中调用，它都会返回同一个响应式的 `theme` 和 `toggleTheme` 方法。这样，当你在任何一个组件中切换主题时，所有使用了这个状态的组件都会更新。

### useAsyncState

`useAsyncState` 是 VueUse 库中的一个函数，它用于处理异步状态和副作用。这个函数可以帮助你在 Vue 组件中更方便地处理异步请求，同时提供了加载状态和错误处理。

下面是一个使用 `useAsyncState` 的例子，假设我们要从一个 API 异步获取一些数据：

首先，确保你已经安装了 `@vueuse/core`：

```bash
npm install @vueuse/core
```

然后，在你的 Vue 组件中使用 `useAsyncState`：

```javascript
import { useAsyncState } from '@vueuse/core';

export default {
  setup() {
    // 定义一个异步函数，例如从 API 获取数据
    async function fetchData() {
      const response = await fetch('https://api.example.com/data');
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      return response.json();
    }

    // 使用 useAsyncState 来调用 fetchData，并管理状态
    const { state, isReady, isLoading, error } = useAsyncState(
      fetchData(), // 调用 fetchData 并传递初始值
      [] // 初始值，可以根据你的数据类型进行调整
    );

    return {
      data: state,
      isReady,
      isLoading,
      error,
    };
  },
};
```

在模板中，你可以这样使用：

```html
<template>
  <div>
    <!-- 显示加载状态 -->
    <div v-if="isLoading">Loading...</div>

    <!-- 显示错误信息 -->
    <div v-if="error">Error: {{ error.message }}</div>

    <!-- 显示获取到的数据 -->
    <div v-if="isReady">
      <ul>
        <li v-for="item in data" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>
```

在这个例子中，`useAsyncState` 被用来包装 `fetchData` 函数。它返回的 `state` 是一个响应式引用，包含了异步请求的结果。`isLoading` 是一个布尔值，表示异步操作是否正在进行。`isReady` 也是一个布尔值，表示异步操作是否已经完成并且数据已经准备好。`error` 是一个引用，如果在异步操作中抛出错误，它会包含错误信息。

这样，你就可以在组件中很方便地管理异步数据的状态，并在模板中根据不同的状态渲染不同的 UI。

### useLastChanged

`useLastChanged` 是 VueUse 库中的一个函数，它用于跟踪响应式引用的最后一次改变。这个函数返回一个包含最后一次改变的时间戳的响应式引用。

下面是一个使用 `useLastChanged` 的例子：

首先，确保你已经安装了 `@vueuse/core`：

```bash
npm install @vueuse/core
```

然后，在你的 Vue 组件中使用 `useLastChanged`：

```javascript
import { ref } from 'vue';
import { useLastChanged } from '@vueuse/core';

export default {
  setup() {
    // 创建一个响应式引用
    const count = ref(0);

    // 使用 useLastChanged 跟踪 count 的最后一次改变
    const lastChanged = useLastChanged(count);

    // 创建一个函数，用于改变 count 的值
    function increment() {
      count.value++;
    }

    return {
      count,
      lastChanged,
      increment,
    };
  },
};
```

在模板中，你可以这样使用：

```html
<template>
  <div>
    <button @click="increment">增加</button>
    <p>当前值：{{ count }}</p>
    <p>最后一次改变：{{ new Date(lastChanged) }}</p>
  </div>
</template>
```

在这个例子中，`useLastChanged` 被用来跟踪 `count` 的最后一次改变。每次 `count` 的值改变时，`lastChanged` 的值会更新为当前的时间戳。然后，我们在模板中显示这个时间戳，表示 `count` 的最后一次改变的时间。

这样，你就可以在组件中很方便地跟踪响应式引用的最后一次改变，并在模板中显示这个时间。

### useLocalStorage

`useLocalStorage` 是 VueUse 库中的一个函数，它用于在浏览器的本地存储（localStorage）中存储和读取数据。这个函数返回一个响应式引用，你可以通过改变这个引用的值来改变 localStorage 中的数据，也可以通过读取这个引用的值来读取 localStorage 中的数据。

下面是一个使用 `useLocalStorage` 的例子：

首先，确保你已经安装了 `@vueuse/core`：

```bash
npm install @vueuse/core
```

然后，在你的 Vue 组件中使用 `useLocalStorage`：

```javascript
import { useLocalStorage } from '@vueuse/core';

export default {
  setup() {
    // 使用 useLocalStorage 创建一个响应式引用，这个引用对应 localStorage 中的 'count' 数据
    const count = useLocalStorage('count', 0);

    // 创建一个函数，用于改变 count 的值
    function increment() {
      count.value++;
    }

    return {
      count,
      increment,
    };
  },
};
```

在模板中，你可以这样使用：

```html
<template>
  <div>
    <button @click="increment">增加</button>
    <p>当前值：{{ count }}</p>
  </div>
</template>
```

在这个例子中，`useLocalStorage` 被用来创建一个`响应式`引用，这个引用对应 localStorage 中的 'count' 数据。每次 `count` 的值改变时，localStorage 中的 'count' 数据也会相应地改变。同时，如果你刷新浏览器，`count` 的值会保持为最后一次改变的值，因为这个值已经被存储在了 localStorage 中。

这样，你就可以在组件中很方便地使用 localStorage 来存储和读取数据。

### useManualRefHistory

`useManualRefHistory` 是 VueUse 库中的一个函数，用于手动跟踪响应式引用（`ref`）的历史记录。与 `useRefHistory` 不同，`useManualRefHistory` 不会自动记录每次引用值的变化，而是需要你手动触发记录。

下面是一个使用 `useManualRefHistory` 的例子：

首先，确保你已经安装了 `@vueuse/core`：

```bash
npm install @vueuse/core
```

然后，在你的 Vue 组件中使用 `useManualRefHistory`：

```javascript
import { ref } from 'vue';
import { useManualRefHistory } from '@vueuse/core';

export default {
  setup() {
    // 创建一个响应式引用
    const count = ref(0);

    // 使用 useManualRefHistory 跟踪 count 的历史记录
    const { commit, history } = useManualRefHistory(count);

    // 创建一个函数，用于改变 count 的值并记录历史
    function increment() {
      count.value++;
      commit(); // 手动触发记录历史
    }

    return {
      count,
      increment,
      history,
    };
  },
};
```

在模板中，你可以这样使用：

```html
<template>
  <div>
    <button @click="increment">增加</button>
    <p>当前值：{{ count }}</p>
    <h3>历史记录：</h3>
    <ul>
      <li v-for="(entry, index) in history.present" :key="index">
        {{ entry }}
      </li>
    </ul>
  </div>
</template>
```

在这个例子中，`useManualRefHistory` 被用来创建一个记录 `count` 历史的对象。每次 `count` 的值改变时，你需要调用 `commit()` 函数来手动记录这个变化。历史记录会被保存在 `history` 对象中，你可以在模板中遍历 `history.present` 来显示历史记录。

这样，你就可以在组件中手动控制何时记录响应式引用的历史，以及如何显示这些历史记录。

### useRefHistory

`useRefHistory` 是 VueUse 库中的一个函数，它用于自动跟踪响应式引用（`ref`）的历史记录。每次引用值改变时，`useRefHistory` 都会自动记录这个变化。

下面是一个使用 `useRefHistory` 的例子：

首先，确保你已经安装了 `@vueuse/core`：

```bash
npm install @vueuse/core
```

然后，在你的 Vue 组件中使用 `useRefHistory`：

```javascript
import { ref } from 'vue';
import { useRefHistory } from '@vueuse/core';

export default {
  setup() {
    // 创建一个响应式引用
    const count = ref(0);

    // 使用 useRefHistory 跟踪 count 的历史记录
    const { history } = useRefHistory(count);

    // 创建一个函数，用于改变 count 的值
    function increment() {
      count.value++;
    }

    return {
      count,
      increment,
      history,
    };
  },
};
```

在模板中，你可以这样使用：

```html
<template>
  <div>
    <button @click="increment">增加</button>
    <p>当前值：{{ count }}</p>
    <h3>历史记录：</h3>
    <ul>
      <li v-for="(entry, index) in history.entries" :key="index">
        {{ entry }}
      </li>
    </ul>
  </div>
</template>
```

在这个例子中，`useRefHistory` 被用来创建一个记录 `count` 历史的对象。每次 `count` 的值改变时，历史记录会自动更新。历史记录会被保存在 `history` 对象中，你可以在模板中遍历 `history.entries` 来显示历史记录。

这样，你就可以在组件中自动跟踪响应式引用的历史，以及如何显示这些历史记录。

### useStorageAsync

`useStorageAsync` 是 VueUse 库中的一个函数，它用于异步地读取和写入存储（例如 localStorage 或 sessionStorage）。这个函数返回一个响应式引用，你可以用它来获取和设置存储的值。

下面是一个使用 `useStorageAsync` 的例子：

首先，确保你已经安装了 `@vueuse/core`：

```bash
npm install @vueuse/core
```

然后，在你的 Vue 组件中使用 `useStorageAsync`：

```javascript
import { useStorageAsync } from '@vueuse/core';

export default {
  async setup() {
    // 使用 useStorageAsync 创建一个响应式引用，用于读取和写入 'count' 键的值
    const count = useStorageAsync('count', 0);

    // 等待存储的值被读取
    await count.ready;

    // 创建一个函数，用于增加 count 的值
    function increment() {
      count.value++;
    }

    return {
      count,
      increment,
    };
  },
};
```

在模板中，你可以这样使用：

```html
<template>
  <div>
    <button @click="increment">增加</button>
    <p>当前值：{{ count }}</p>
  </div>
</template>
```

在这个例子中，`useStorageAsync` 被用来创建一个响应式引用 `count`，它的值是存储中 'count' 键的值。如果存储中没有 'count' 键，那么 `count` 的初始值会是 0。每次 `count` 的值改变时，这个变化会自动保存到存储中。

注意，因为 `useStorageAsync` 是异步的，所以在使用 `count` 之前，你需要等待 `count.ready` Promise 解析。这确保了存储的值已经被正确地读取到 `count` 中。

这样，你就可以在组件中异步地读取和写入存储的值，以及如何显示这些值。

### useThrottledRefHistory

`useThrottledRefHistory` 是 VueUse 库中的一个函数，它用于自动跟踪响应式引用（`ref`）的历史记录，并且在记录历史时会进行节流处理。这意味着在指定的时间间隔内，只会记录最后一次的值变化。

下面是一个使用 `useThrottledRefHistory` 的例子：

首先，确保你已经安装了 `@vueuse/core`：

```bash
npm install @vueuse/core
```

然后，在你的 Vue 组件中使用 `useThrottledRefHistory`：

```javascript
import { ref } from 'vue';
import { useThrottledRefHistory } from '@vueuse/core';

export default {
  setup() {
    // 创建一个响应式引用
    const count = ref(0);

    // 使用 useThrottledRefHistory 跟踪 count 的历史记录，节流间隔为 1000 毫秒
    const { history } = useThrottledRefHistory(count, 1000);

    // 创建一个函数，用于改变 count 的值
    function increment() {
      count.value++;
    }

    return {
      count,
      increment,
      history,
    };
  },
};
```

在模板中，你可以这样使用：

```html
<template>
  <div>
    <button @click="increment">增加</button>
    <p>当前值：{{ count }}</p>
    <h3>历史记录：</h3>
    <ul>
      <li v-for="(entry, index) in history.entries" :key="index">
        {{ entry }}
      </li>
    </ul>
  </div>
</template>
```

在这个例子中，`useThrottledRefHistory` 被用来创建一个记录 `count` 历史的对象。每次 `count` 的值改变时，历史记录会自动更新，但是在 1000 毫秒的间隔内，只会记录最后一次的值变化。历史记录会被保存在 `history` 对象中，你可以在模板中遍历 `history.entries` 来显示历史记录。

这样，你就可以在组件中自动跟踪响应式引用的历史，并且在记录历史时进行节流处理。

## elements

### useActiveElement

`useActiveElement` 是 VueUse 库中的一个函数，它用于跟踪当前活动（聚焦）的元素。当用户在页面上的不同元素之间切换焦点时，这个函数会自动更新活动元素的引用。

下面是一个使用 `useActiveElement` 的例子：

首先，确保你已经安装了 `@vueuse/core`：

```bash
npm install @vueuse/core
```

然后，在你的 Vue 组件中使用 `useActiveElement`：

```javascript
import { useActiveElement } from '@vueuse/core';

export default {
  setup() {
    // 使用 useActiveElement 跟踪当前活动元素
    const activeElement = useActiveElement();

    return {
      activeElement,
    };
  },
};
```

在模板中，你可以这样使用：

```html
<template>
  <div>
    <input type="text" placeholder="输入框 1" />
    <input type="text" placeholder="输入框 2" />
    <p>当前活动元素：{{ activeElement.tagName }} ({{ activeElement.placeholder }})</p>
  </div>
</template>
```

在这个例子中，`useActiveElement` 被用来创建一个响应式引用 `activeElement`，它的值是当前活动（聚焦）的元素。当用户在输入框之间切换焦点时，`activeElement` 的值会自动更新。在模板中，你可以使用 `activeElement.tagName` 和 `activeElement.placeholder` 来显示当前活动元素的标签名和占位符文本。

这样，你就可以在组件中跟踪当前活动（聚焦）的元素，并在模板中显示相关信息。

### useDocumentVisibility

`useDocumentVisibility` 是 VueUse 库中的一个函数，它用于跟踪文档的可见性状态。当用户切换到其他标签页或最小化浏览器窗口时，文档会变为不可见状态，这个函数会自动更新文档的可见性状态。

下面是一个使用 `useDocumentVisibility` 的例子：

首先，确保你已经安装了 `@vueuse/core`：

```bash
npm install @vueuse/core
```

然后，在你的 Vue 组件中使用 `useDocumentVisibility`：

```javascript
import { useDocumentVisibility } from '@vueuse/core';

export default {
  setup() {
    // 使用 useDocumentVisibility 跟踪文档的可见性状态
    const visibility = useDocumentVisibility();

    return {
      visibility,
    };
  },
};
```

在模板中，你可以这样使用：

```html
<template>
  <div>
    <p>文档的可见性状态：{{ visibility }}</p>
  </div>
</template>
```

在这个例子中，`useDocumentVisibility` 被用来创建一个响应式引用 `visibility`，它的值是文档的可见性状态。当用户切换到其他标签页或最小化浏览器窗口时，`visibility` 的值会自动更新。在模板中，你可以使用 `visibility` 来显示文档的可见性状态。

这样，你就可以在组件中跟踪文档的可见性状态，并在模板中显示相关信息。

### useDraggable

要实现拖拽后元素的位置改变，你可以使用 `useDraggable` 函数返回的 `x` 和 `y` 值。这两个值表示元素从其初始位置移动的距离。你可以使用这两个值来更新元素的位置。

下面是一个例子：

```vue
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
```

在这个例子中，我们使用 `useDraggable` 的返回值 `x` 和 `y` 来更新元素的位置。我们在模板中使用 `:style` 绑定来设置元素的 `transform` 属性，使元素根据 `x` 和 `y` 的值移动。

注意，我们在样式中设置了 `position: relative;`，这是因为 `transform` 属性只对定位元素有效。在这个例子中，我们使元素相对于其初始位置定位，所以设置 `position: relative;`。

现在，当你拖拽这个元素时，它会根据你的拖拽移动，当你释放鼠标时，它会停在当前位置。

### useDropZone

`useDropZone` 是 VueUse 库中的一个函数，用于实现拖放区域的功能。它提供了一种简单的方法来创建一个可以接收拖放的区域，并且能够响应拖放事件。

下面是一个使用 `useDropZone` 的例子：

首先，确保你已经安装了 `@vueuse/core`：

```bash
npm install @vueuse/core
```

然后，在你的 Vue 组件中使用 `useDropZone`：

```vue
<template>
  <div ref="dropZoneElement" class="drop-zone">
    拖放文件到这里
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDropZone } from '@vueuse/core'

const dropZoneElement = ref(null)
function dropZoneFn(e) {
  console.log('Dropped files:', e.dataTransfer.files)
}
// 使用 useDropZone 创建一个拖放区域
useDropZone(dropZoneElement, dropZoneFn)
</script>

<style>
.drop-zone {
  width: 200px;
  height: 200px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

在这个例子中，我们首先通过 `ref` 函数创建了一个引用 `dropZoneElement`，然后在模板中给一个 `div` 元素设置了 `ref="dropZoneElement"`，这样我们就可以在 JavaScript 中访问这个 DOM 元素。

接着，我们在 `setup` 函数中调用 `useDropZone` 并传入 `dropZoneElement` 作为参数，这样就创建了一个可以接收拖放的区域。

然后，我们监听 `drop` 事件，当用户拖放文件到这个区域时，我们可以在事件处理函数中获取到拖放的文件。

最后，我们通过样式添加了一些基础的拖放区域样式。

现在，你可以试试拖放文件到这个区域，然后在浏览器的控制台中查看拖放的文件信息。

### useElementVisibility

`useElementVisibility` 是 VueUse 库中的一个函数，它可以用来检测一个元素是否在视口中可见。这个函数返回一个响应式的 `ref` 对象，当元素在视口中可见时，这个 `ref` 对象的值为 `true`，否则为 `false`。

下面是一个使用 `useElementVisibility` 的例子：

首先，确保你已经安装了 `@vueuse/core`：

```bash
npm install @vueuse/core
```

然后，在你的 Vue 组件中使用 `useElementVisibility`：

```vue
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
```

在这个例子中，我们首先通过 `ref` 函数创建了一个引用 `myElement`，然后在模板中给一个 `div` 元素设置了 `ref="myElement"`，这样我们就可以在 JavaScript 中访问这个 DOM 元素。

接着，我们在 `setup` 函数中调用 `useElementVisibility` 并传入 `myElement` 作为参数，这样就可以创建一个响应式的 `ref` 对象 `isVisible`，用来检测元素是否在视口中可见。

然后，我们在模板中使用 `v-if` 和 `v-else` 指令来根据 `isVisible` 的值显示不同的文本。

现在，你可以试试滚动页面，看看元素是否在视口中可见的文本是否会根据元素的可见性改变。

### useWindowFocus

VueUse 是一个 Vue Composable 函数库，其中的 `useWindowFocus` 函数用于检测当前浏览器窗口是否处于聚焦状态。以下是一个使用 `useWindowFocus` 的例子：

首先，你需要安装 `@vueuse/core` 包，如果你还没有安装，可以使用以下命令进行安装：

```bash
npm install @vueuse/core
# 或者
yarn add @vueuse/core
```

然后，在你的 Vue 组件中，你可以这样使用 `useWindowFocus`：

```javascript
<template>
  <div>
    <h1>Window is {{ isFocused ? 'focused' : 'not focused' }}</h1>
  </div>
</template>

<script>
import { useWindowFocus } from '@vueuse/core'

export default {
  setup() {
    const isFocused = useWindowFocus()

    return {
      isFocused
    }
  }
}
</script>
```

在这个例子中，`useWindowFocus` 返回一个响应式的 `Ref` 对象，当窗口聚焦时，`isFocused.value` 为 `true`，当窗口失去焦点时，`isFocused.value` 为 `false`。我们在模板中使用这个 `isFocused` 来动态显示窗口是否处于聚焦状态。

注意：`useWindowFocus` 只能在 Vue 组件的 `setup` 函数中使用。

### useWindowScroll

`useWindowScroll` 是 VueUse 库中的一个函数，它可以用来获取和监听浏览器窗口的滚动位置。以下是一个使用 `useWindowScroll` 的例子：

首先，确保你已经安装了 `@vueuse/core` 包，如果你还没有安装，可以使用以下命令进行安装：

```bash
npm install @vueuse/core
# 或者
yarn add @vueuse/core
```

然后，在你的 Vue 组件中，你可以这样使用 `useWindowScroll`：

```javascript
<template>
  <div>
    <h1>Window scroll position: {{ x }} x {{ y }}</h1>
  </div>
</template>

<script>
import { useWindowScroll } from '@vueuse/core'

export default {
  setup() {
    const { x, y } = useWindowScroll()

    return {
      x,
      y
    }
  }
}
</script>
```

在这个例子中，`useWindowScroll` 返回一个包含 `x` 和 `y` 的对象，这两个值分别代表窗口的水平和垂直滚动位置。我们在模板中使用这两个值来动态显示窗口的滚动位置。

注意：`useWindowScroll` 只能在 Vue 组件的 `setup` 函数中使用。

