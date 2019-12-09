const VuexLoadingPlugin = ({ namespace: NAMESPACE = "loading" } = {}) => {
  const SHOW = "LOADING_SHOW"
  const HIDE = "LOADING_HIDE"
  return store => {
    if (store.state[NAMESPACE]) {
      throw new Error(`vuexloadingplugin: ${NAMESPACE} exited in current store`)
    }
    store.registerModule(NAMESPACE, {
      namespaced: true, // 使其成为带命名空间的模块。
      state: {
        status: {}
      },
      mutations: {
        [SHOW](state, { payload }) {
          state.status = {
            ...state.status,
            [payload]: true
          }
        },
        [HIDE](state, { payload }) {
          state.status = {
            ...state.status,
            [payload]: false
          }
        }
      }
    })

    store.subscribeAction({
      // 指定订阅处理函数的被调用时机在一个 action 分发之前
      before: action => {
        store.commit(
          {
            type: `${NAMESPACE}/${SHOW}`,
            payload: action.type
          },
          { root: true }
        ) // 它允许在命名空间模块里提交根的 mutation。
      },
      // 指定订阅处理函数的被调用时机在一个 action 分发之后
      after: action => {
        store.commit(
          {
            type: `${NAMESPACE}/${HIDE}`,
            payload: action.type
          },
          { root: true }
        )
      }
    })
  }
}

export default VuexLoadingPlugin
