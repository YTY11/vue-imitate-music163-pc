const state = {
  device: 'desktop' // desktop 或 mobile 模式
}

const mutations = {
  // 设置 desktop 或 mobile 模式
  SET_DEVICE: (state, data) => {
    state.device = data
  }
}

const actions = {
  // pc 移动界面切换
  setDevice({ commit }, data) {
    commit('SET_DEVICE', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
