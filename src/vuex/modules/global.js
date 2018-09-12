// 该模块的初始状态
const state = {
  btnLoadingStr: null,
  btnLoadingID: null
}
// getters
const getters = {
  btnLoading: state => {
    return {
      id: state.btnLoadingID,
      str: state.btnLoadingStr
    }
  }
}
// 相关的 mutations
const mutations = {
  UPDATE_BTNLOADINGSTR (state, load) {
    if (load) {
      state.btnLoadingStr = load.str
      state.btnLoadingID = load.id
    } else {
      state.btnLoadingStr = null
      state.btnLoadingID = null
    }
  }
}
const actions = {}
export default {
  state,
  mutations,
  getters,
  actions
}
