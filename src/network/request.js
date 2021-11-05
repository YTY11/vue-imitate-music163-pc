import axios from 'axios'
import { getToken, getCookieData } from '@/utility/user'

import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import { Loading } from 'element-ui'
NProgress.configure({ showSpinner: false }) // 去除右上角圆环进度条
let loading = null // 定义loading变量

// 开始 加载loading
const startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: '',
    spinner: '',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
// 结束 取消loading加载
const endLoading = () => {
  loading.close()
}

// showFullScreenLoading() 与 tryHideFullScreenLoading() 目的是合并同一页面多个请求触发loading
let needLoadingRequestCount = 0 // 声明一个变量

const showFullScreenLoading = () => {
  if (needLoadingRequestCount === 0) { // 当等于0时证明第一次请求 这时开启loading
    startLoading()
  }
  needLoadingRequestCount++ // 全局变量值++
}

const tryHideFullScreenLoading = () => {
  if (needLoadingRequestCount <= 0) return // 小于等于0 证明没有开启loading 此时return
  needLoadingRequestCount-- // 正常响应后 全局变量 --
  if (needLoadingRequestCount === 0) { // 等于0 时证明全部加载完毕 此时结束loading 加载
    endLoading()
  }
}
export function request(config) {
  // eslint-disable-next-line new-cap
  const instance = new axios.create({
    baseURL: '/music', // 地址
    timeout: 5000, // 超时时间
    method: config.method === undefined ? 'get' : config.method, // 请求方法
    withCredentials: true // 如果是跨域请求 接口文档要求
  })

  // axios 请求拦截
  // 就是在请求数据时对数据做一些处理
  instance.interceptors.request.use(config => {
    NProgress.start() // 开启顶部进度条
    // 跳过二维码接口
    const index = config.url.indexOf('/login/qr')
    if (index < 0) {
      showFullScreenLoading() // 开启loading加载
    }
    return config
  }, err => {
    console.log(err)
    tryHideFullScreenLoading()
  })

  // axios 响应拦截
  // 对返回的数据做一些处理
  instance.interceptors.response.use(res => {
    NProgress.done() // 关闭顶部进度条
    tryHideFullScreenLoading() // 关闭loading加载
    return res.data
  }, err => {
    console.log(err)
    tryHideFullScreenLoading()
  })

  return instance(config)
}
