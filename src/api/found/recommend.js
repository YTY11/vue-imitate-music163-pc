import { request } from '@/network/request'

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
  console.log(data)
  return request({
    url: '/comment/playlist',
    params: data
  })
}
