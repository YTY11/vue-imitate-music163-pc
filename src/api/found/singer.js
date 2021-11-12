import { request } from '@/network/request'

// 获取歌手分类列表
export function getSingerList(info) {
  return request({
    url: '/artist/list',
    params: {
      type: info.type,
      area: info.area,
      initial: info.initial,
      limit: info.limit,
      offset: (info.offset - 1) * info.limit
    }
  })
}
// 歌手详情
export function getArtistDetail(id) {
  return request({
    url: `/artist/desc?id=${id}`
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
    url: '/artist/album',
    params: {
      id: info.id,
      limit: info.pagesize,
      offset: (info.pagenum - 1) * info.pagesize
    }
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
// 获取歌词
export function getLyric(id) {
  return request({
    url: '/lyric',
    params: {
      id: id
    }
  })
}
// 获取歌手MV信息
export function getArtistMV(id) {
  return request({
    url: '/artist/mv',
    params: {
      id: id
    }
  })
}
// 获取Mv url
export function getMvInfo(id) {
  return request({
    url: '/mv/url',
    params: {
      id: id
    }
  })
}
// 可获取对应 MV 数据 , 数据包含 mv 名字 , 歌手 , 发布时间
export function getMvDetail(id) {
  return request({
    url: '/mv/detail',
    params: {
      mvid: id
    }
  })
}
// 获取 mv 点赞转发评论数数据
export function getMvDetailInfo(id) {
  return request({
    url: '/mv/detail/info',
    params: {
      mvid: id
    }
  })
}
// 获取 相似MV
export function getSimiMv(id) {
  return request({
    url: '/simi/mv',
    params: {
      mvid: id
    }
  })
}
// 获取 MV 评论
export function getCommentMv(info) {
  return request({
    url: '/comment/mv',
    params: {
      id: info.id,
      limit: info.pagesize,
      offset: (info.pagenum - 1) * info.pagesize
    }
  })
}
// 获取相似歌手
export function getSimiArtist(id) {
  return request({
    url: '/simi/artist',
    params: {
      id: id
    }
  })
}
