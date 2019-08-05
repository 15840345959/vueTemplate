export default {
  namespaced: true,

  state: {
    scrolls: {}
  },

  mutations: {
    // 保存传入的所有滚动条位置对象
    save (state, payload){
      state.scrolls = { ...state.scrolls, ...payload }
    }
  },

  actions: {
    
  }
}