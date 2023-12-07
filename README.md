# vueuse

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