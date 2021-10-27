// 引入token 设置方法
import { getToken, setToken, removeToken, setCookieData, getCookieData, removeCookieData } from '@/utility/user'

const state = {
  cookie: getCookieData(),
  token: getToken()
}

const mutations = {
  // 设置 token
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  // 设置cookie
  SET_COOKIE: (state, data) => {
    state.cookie = data
    setCookieData(data)
  },
  // 退出
  LOGOUT: (state) => {
    state.cookie = ''
    state.token = ''
  }
}

const actions = {

  // 退出登录
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('LOGOUT')
      removeToken()
      removeCookieData()
      resolve('退出成功')
    }).catch(err => {
      reject(err)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
