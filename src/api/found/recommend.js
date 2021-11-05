import { request } from '@/network/request'
import { dateFormat } from '@/utility/utils'
// 轮播图数据
export function getBanner() {
  return request({
    url: '/banner?type=0'
  })
}
// 个性推荐
export function getPersonalized() {
  return request({
    url: '/personalized'
  })
}
// 热门歌单
export function getPlayHot() {
  return request({
    url: '/playlist/hot'
  })
}
// 精品歌单标签
export function getHighqualityTags() {
  return request({
    url: '/playlist/highquality/tags'
  })
}
// 精品歌单
export function getHighquality(tag) {
  return request({
    url: `/top/playlist/highquality?limit=1&cat=${tag}`
  })
}
// 根据分类获取歌单
export function getPlaylist(queryInfo) {
  return request({
    url: `/top/playlist?cat=${queryInfo.tag}&offset=${queryInfo.pagenum}&limit=${queryInfo.pagesize}`
  })
}
// 全部歌单分类数据
export function getTagsListAll() {
  return request({
    url: '/playlist/catlist'
  })
}
// 根据歌单id 获取歌单详情信息
export function getSongDetail(id) {
  return request({
    url: `/playlist/detail?id=${id}`
  })
}
// 歌单详情动态
// 说明 : 调用后可获取歌单详情动态部分,如评论数,是否收藏,播放数
export function getPlayListDynamic(id) {
  return request({
    url: `/playlist/detail/dynamic?id=${id}`
  })
}
// 推荐 mv
export function getMvData() {
  return request({
    url: '/personalized/mv'
  })
}
// 获取用户详情
export function getUserDetail(uid) {
  return request({
    url: `/user/detail?uid=${uid}`
  })
}
// 歌单评论
export function getCommentPlayList(data) {
  return request({
    url: '/comment/playlist',
    params: data
  })
}
// 获取歌曲详情
export function getSongs(ids) {
  return request({
    url: `/song/detail?ids=${ids}`
  })
}

// 歌曲信息 格式
export class SongList {
  constructor(song) {
    this.id = song.id // 歌曲id
    this.url = song.url // 歌曲url
    this.type = song.type // 歌曲类型
    this.name = song.name // 歌曲名字
    this.album = song.al.name // 专辑名字
    this.artist = song.ar[0].name // 作者名字
    this.pic = song.al.picUrl // 图片
    this.time = dateFormat('mm:ss', new Date(song.dt)) // 歌曲时长
  }
}

// 获取歌曲
export function getSongUrl(id) {
  return request({
    url: `/song/url?id=${id}`
  })
}
// 获取所有排行榜
export function getToplist() {
  return request({
    url: '/toplist'
  })
}
