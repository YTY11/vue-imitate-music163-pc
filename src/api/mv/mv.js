import { request } from '@/network/request'

// 推荐MV
export function getPersonalizedMv() {
  return request({
    url: '/personalized/mv'
  })
}
// 网易出品MV
export function getExclusiveRcmd(info) {
  return request({
    url: '/mv/exclusive/rcmd',
    params: {
      limit: info.pagesize,
      offset: (info.pagenum - 1) * info.pagesize
    }
  })
}
// 全部MV
export function getMVAll(info) {
  return request({
    url: '/mv/all',
    params: {
      area: info.area,
      type: info.type,
      order: info.order,
      limit: info.pagesize,
      offset: (info.pagenum - 1) * info.pagesize
    }
  })
}
// MV排行榜
export function getTopMV(info) {
  return request({
    url: '/top/mv',
    params: {
      area: info.area,
      limit: info.pagesize,
      offset: (info.pagenum - 1) * info.pagesize
    }
  })
}
// 最新MV
export function getMVFirst(info) {
  return request({
    url: '/mv/first',
    params: {
      area: info.area,
      limit: info.pagesize
    }
  })
}
