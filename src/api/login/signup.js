import { request } from '@/network/request'

// 注册/修改密码
export function signup(userInfo) {
  return request({
    url: '/register/cellphone',
    method: 'post',
    data: {
      captcha: userInfo.captcha,
      phone: userInfo.phone,
      password: userInfo.password,
      nickname: userInfo.nickname
    }
  })
}
