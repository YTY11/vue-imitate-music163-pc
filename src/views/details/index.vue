<template>
  <div class="detail">
     <!-- 头部 -->
     <DetailHeader :songs="songs" :dynamicData="dynamicData" :commitPlayList="commitPlayList" :profile="profile" :playlist="playlist"/>
     <!-- 列表 -->
     <DetailList :songs="songs" :dynamicData="dynamicData" :playlist="playlist"/>
  </div>
</template>

<script>
// 头部组件
import DetailHeader from './childComps/DetailHeader'
// 列表
import DetailList from './childComps/DetailList'

// 网络数据
import { SongList, getSongDetail, getUserDetail, getCommentPlayList, getPlayListDynamic, getSongs, getSongUrl } from '@/api/found/recommend'
export default {
  name: 'Detail',
  components: {
    DetailHeader,
    DetailList
  },
  data() {
    return {
      // 歌单列表
      playlist: {},
      privileges: [],
      // 歌单创建用户信息
      profile: {},
      // 评论数据
      commitPlayList: {},
      // 获取评论数据参数
      commitInfo: {
        // 歌单id
        id: '',
        // 取多少条
        offset: 20
      },
      // 歌单详情动态
      dynamicData: {},
      // 歌曲详情
      songs: []
    }
  },
  async created() {
    // 获取歌单详情
    const { code, playlist, privileges } = await getSongDetail(this.$route.params.id)
    if (code !== 200) return this.$message('error', '歌单详情数据获取失败')
    this.playlist = playlist
    this.privileges = privileges
    let songIds = []
    playlist.trackIds.forEach(item => {
      songIds.push(item.id)
    })
    songIds = songIds.join(',')

    // 歌单详情动态
    const dynamicData = await getPlayListDynamic(this.$route.params.id)
    if (dynamicData.code !== 200) return this.$message('error', '歌单详情动态数据获取失败')
    this.dynamicData = dynamicData

    // 获取用户信息
    const { code: status, profile } = await getUserDetail(playlist.userId)
    if (status !== 200) return this.$message('error', '用户信息获取失败')
    this.profile = profile

    // 获取评论数据
    this.commitInfo.id = playlist.id
    const data = await getCommentPlayList(this.commitInfo)
    if (data.code !== 200) return this.$message('error', '评论信息获取失败')
    this.commitPlayList = data

    // 获取歌曲详情
    const songs = await getSongs(songIds)
    if (songs.code !== 200) return this.$message('error', '歌曲详情获取失败')

    // 获取歌曲url
    const songUrls = await getSongUrl(songIds)
    if (songUrls.code !== 200) return this.$message('error', '歌曲详情获取失败')

    this.songs = []
    songs.songs.forEach((item, index) => {
      item.url = (songUrls.data)[index].url
      item.type = (songUrls.data)[index].type
      this.songs.push(new SongList(item))
    })
    console.log(songUrls.data)
    console.log(this.songs)

    // console.log(data)
    // console.log(profile)
    // console.log(privileges)
  }
}
</script>

<style lang="scss" scoped>
// .detail{
// }
</style>
