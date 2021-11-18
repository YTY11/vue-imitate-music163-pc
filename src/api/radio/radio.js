import { request } from '@/network/request'

// 分类
export function getDjCatelist() {
  return request({
    url: '/dj/catelist'
  })
}
// 推荐节目
export function getProgramRecommend(limit = 10) {
  return request({
    url: '/program/recommend',
    params: {
      limit: limit
    }
  })
}
// 节目榜
export function getProgramToplist(info) {
  return request({
    url: '/dj/program/toplist',
    params: {
      limit: info.pagesize,
      offset: (info.pagenum - 1) * info.pagesize
    }
  })
}
// 节目详情
export function getProgramDetail(id) {
  return request({
    url: '/dj/program/detail',
    params: {
      id: id
    }
  })
}
// 电台 - 分类推荐
export function getRecommendType(type) {
  return request({
    url: '/dj/recommend/type',
    params: {
      type: type
    }
  })
}
// 电台播放数据格式
export class DjData {
  constructor(dj) {
    this.id = dj.id // 电台id
    this.url = dj.url // 电台url
    this.type = dj.type // 电台类型
    this.name = dj.name // 节目名
    this.artist = dj.artist // 电台名
    this.pic = dj.pic // 图片
    this.time = dj.time // 时长
    this.lyric = '' // 歌词
  }
}
