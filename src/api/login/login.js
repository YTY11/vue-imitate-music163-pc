import { request } from '@/network/request'

// 手机号/邮箱 密码登录
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
      [acount]: loginData.username,
      password: loginData.password
    }
  })
}

// 验证码登录
export function loginCaptcha(loginData) {
  return request({
    url: '/login/cellphone',
    method: 'post',
    data: {
      phone: loginData.phone,
      captcha: loginData.captcha
    }
  })
}

// 验证码验证/captcha/verify
export function captchaVerify(data) {
  return request({
    url: '/captcha/verify',
    method: 'post',
    data: {
      phone: data.phone,
      captcha: data.captcha
    }
  })
}

// 获取登录验证码
export function getLoginCaptcha(loginData) {
  return request({
    url: '/captcha/sent',
    method: 'post',
    data: {
      phone: loginData.phone
    }
  })
}

// 二维码key生成接口
export function getErWeiMaKey() {
  return request({
    url: `/login/qr/key?timerstamp=${Date.now()}`,
    withCredentials: true
  })
}

// 二维码生成接口
export function getErWeiMa(key) {
  return request({
    url: `/login/qr/create?key=${key}&qrimg=true&timerstamp=${Date.now()}`
  })
}
// 二维码登录状态
export function getErWeiMaStatus(key) {
  console.log(key)
  return request({
    url: `/login/qr/check?key=${key}&qrimg=true&timerstamp=${Date.now()}`
  })
}
// 用户登录状态
export function loginStatus() {
  return request({
    url: '/login/status',
    method: 'post',
    data: {
      timerstamp: Date.now()
    }
  })
}
