import { request } from '@/network/request'
import { formatSeconds } from '@/utility/utils'
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
// 电台节目评论
export function getCommentDj(info) {
  return request({
    url: '/comment/dj',
    params: {
      id: info.id,
      limit: info.pagesize,
      offset: (info.pagenum - 1) * info.pagesize
    }
  })
}
// 电台节目
export function getDjProgram(info) {
  return request({
    url: '/dj/program',
    params: {
      rid: info.rid,
      limit: info.pagesize,
      offset: (info.pagenum - 1) * info.pagesize
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
export class DjSongData {
  constructor(song) {
    this.id = song.id // 歌曲id
    this.url = song.url // 歌曲url
    this.type = song.type // 歌曲类型
    this.name = song.name // 歌曲名字
    this.album = song.album.name // 专辑名字
    this.artist = song.artists[0].name // 作者名字
    this.pic = song.album.picUrl // 图片
    this.time = formatSeconds(song.duration / 1000) // 歌曲时长
    this.lyric = '' // 歌词
  }
}
