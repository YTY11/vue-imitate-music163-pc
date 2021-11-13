import { request } from '@/network/request'

// 获取视频标签列表
export function getVideoGroupList() {
  return request({
    url: '/video/group/list'
  })
}
// 获取视频标签/分类下的视频
export function getVideoGroup(info) {
  return request({
    url: '/video/group',
    params: {
      id: info.id,
      offset: (info.pagenum - 1) * info.pagesize
    }
  })
}
// 获取全部视频列表
export function getVideoTimelineAll(info) {
  return request({
    url: '/video/timeline/all',
    params: {
      offset: (info.pagenum - 1) * info.pagesize
    }
  })
}
// 获取推荐视频
export function getVideoTimelineRecommend(info) {
  return request({
    url: '/video/timeline/recommend',
    params: {
      offset: (info.pagenum - 1) * info.pagesize
    }
  })
}
// 获取视频详情
export function getVideoDetail(id) {
  return request({
    url: '/video/detail',
    params: {
      id: id
    }
  })
}
// 获取视频Url播放地址
export function getVideoUrl(id) {
  return request({
    url: '/video/url',
    params: {
      id: id
    }
  })
}
// 获取视频点赞转发评论数数据
export function getVideoDetailInfo(id) {
  return request({
    url: '/video/detail/info',
    params: {
      vid: id
    }
  })
}
// 获取视频点赞转发评论数数据
export function getCommentVideo(info) {
  return request({
    url: '/comment/video',
    params: {
      id: info.id,
      limit: info.pagesize,
      offset: (info.pagenum - 1) * info.pagesize
    }
  })
}
// 获取相关视频
export function getRelatedAllvideo(id) {
  return request({
    url: '/related/allvideo',
    params: {
      id: id
    }
  })
}
