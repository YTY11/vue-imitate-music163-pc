import axios from 'axios'

export function request(config) {
  // eslint-disable-next-line new-cap
  const instance = new axios.create({
    baseURL: 'http://music.api.yty1999.top:9996', // 地址
    timeout: 5000, // 超时时间
    method: config.method === undefined ? 'get' : config.method // 请求方法
  })

  // axios 请求拦截
  // 就是在请求数据时对数据做一些处理
  instance.interceptors.request.use(config => {
    return config
  }, err => console.log(err))

  // axios 响应拦截
  // 对返回的数据做一些处理
  instance.interceptors.respont.use(res => {
    return res.data
  }, err => console.log(err))

  return instance(config)
}
