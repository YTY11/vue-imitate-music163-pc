const state = {
  device: 'desktop', // desktop 或 mobile 模式
  isCollapse: false // 左侧导航栏是否展开
}

const mutations = {
  // 设置 desktop 或 mobile 模式
  SET_DEVICE: (state, data) => {
    state.device = data
  },
  // 设置 左侧导航栏是否展开
  SET_COLLAPSE: (state, data) => {
    state.isCollapse = data
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
