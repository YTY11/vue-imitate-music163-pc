import { request } from '@/network/request'

// 手机号密码登录
export function loginPhone(loginData) {
  let isEmail = false
  const regEmail = /^\w+@\w+(\.\w+)+$/ // 验证邮箱的正则表达式
  if (regEmail.test(loginData.username.trim())) {
    isEmail = true // 合法邮箱
  }
  const acount = isEmail ? 'email' : 'phone'
  return request({
    url: isEmail ? '/login' : '/login/cellphone',
    method: 'post',
    data: {
      [acount]: loginData.username.trim(),
      password: loginData.password.trim()
    }
  })
}
