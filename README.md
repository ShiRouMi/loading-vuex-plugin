# vuex-loading-plugin
通常在调用异步请求的时候，我们会编写很多防御性代码，在请求前设置
`loading: true`，请求后设置 `loading: false`。
这样的行为多次操作后，代码冗余度高且非常不利于维护。
这也是这个插件的设计由来。

首先了解下 Vuex3.1 新增的API --- [subscribeAction](https://vuex.vuejs.org/zh/api/#subscribeaction)

> subscribeAction 也可以指定订阅处理函数的被调用时机应该在一个 action 分发之前还是之后 (默认行为是之前)：

```js
store.subscribeAction({
  before: (action, state) => {
    console.log(`before action ${action.type}`)
  },
  after: (action, state) => {
    console.log(`after action ${action.type}`)
  }
})
```

## usage
```js
//...
import VuexLoadingPlugin from 'src/index.js'
// ...
export default new Vuex.Store({
  plugins: [VuexLoadingPlugin()]
})


// vue 文件中

computed: {
  ...mapState({
    // 假设异步获取数据方法名为 getData
    loading: state => state['loading'].status['getData']
  })
}
```

## 注意
vuex mutation 调用顺序，可能是以下两种情况
1. loadingfalse => 请求调用 => loadingtrue
2. loadingfalse => loadingtrue => 请求调用

取决于开发编写请求调用的 action 是否设置为立即执行，比如
```js
// 情形1
const actions = {
  getData(context, args) {
    return new Promise(resolve => {
      setTimeout(() => {
        getDataAPI(args).then(res => {
          context.commit('getData', res)
        })
        resolve()
      })
    })
  }
}
// 情形2
const actions = {
  async getDate(context, args) {
    await getDataAPI(args).then(res => {
      context.commit('getData', res)
    })
  }
}
```