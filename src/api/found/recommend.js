import { request } from '@/network/request'

// 轮播图数据
export function getBanner() {
  return request({
    url: '/banner?type=0'
  })
}
// 推荐歌单
export function getPersonalized() {
  return request({
    url: '/personalized'
  })
}
// 推荐 mv
export function getMvData() {
  return request({
    url: '/personalized/mv'
  })
}
