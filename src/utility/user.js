import Cookies from 'js-cookie'
// 当前路径下有效 有效7天
// Cookies.set('name', 'value', { expires: 7, path: '' })

// token 名
const TOKEN = 'MUSIC-USER-TOKEN'

// 设置token
export function setToken(token) {
  Cookies.set(TOKEN, token, { expires: 1, path: '' })
}

// 获取token
export function getToken() {
  return Cookies.get(TOKEN)
}

// 移除token
export function removeToken() {
  Cookies.remove(TOKEN)
}

// 设置cookie值
export function setCookieData(data) {
  Cookies.set('设置cookie值', data)
}
