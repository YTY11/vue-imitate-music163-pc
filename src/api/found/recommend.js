import { request } from '@/network/request'

// 轮播图数据
export function getBanner() {
  return request({
    url: '/banner'
  })
}
// 推荐 mv
export function getMvData() {
  return request({
    url: '/personalized/mv'
  })
}
