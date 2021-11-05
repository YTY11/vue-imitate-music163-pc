import { request } from '@/network/request'

// 获取歌手分类列表
export function getSingerList(info) {
  return request({
    url: `/artist/list?type=${info.type}&area=${info.area}&initial=${info.initial}&limit=${info.limit}&offset=${info.offset}`
  })
}
// 歌手详情
export function getArtistDetail(id) {
  return request({
    url: `/artist/detail?id=${id}`
  })
}
// 歌手单曲 部分信息
export function getArtists(id) {
  return request({
    url: `/artists?id=${id}`
  })
}
// 歌手专辑
export function getArtistAlbum(info) {
  return request({
    url: `/artist/album?id=${info.id}&limit=${info.limit}&offset=${info.offset}`
  })
}
// 获取专辑内容
export function getAlbum(id) {
  return request({
    url: `/album?id=${id}`
  })
}
// 专辑动态信息
export function getAlbumDynamic(id) {
  return request({
    url: `/album/detail/dynamic?id=${id}`
  })
}
