// 引入token 设置方法
import { getToken, setToken, removeToken, setCookieData } from '@/utility/user'

const state = {
  cookie: '',
  token: ''
}

const mutations = {
  // 设置cookie
  SET_COOKIE: (state, data) => {
    state.cookie = data
    setCookieData(data)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
