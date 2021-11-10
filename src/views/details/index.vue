<template>
  <div class="detail">
     <!-- 头部 -->
     <AlbumHeader :dynamicData="dynamicData" :playlist="playlist" v-if="title === '专辑'"/>
     <DetailHeader v-else :songs="songs" :dynamicData="dynamicData" :commitPlayList="commitPlayList" :profile="profile" :playlist="playlist"/>
     <el-collapse v-if="title === '专辑'">
      <el-collapse-item title="专辑介绍: ">
        <p  class="company" v-html="playlist.description"></p>
      </el-collapse-item>
     </el-collapse>
     <!-- 列表 -->
     <DetailList :songs="songs" :dynamicData="dynamicData" :playlist="playlist"/>
  </div>
</template>

<script>
// 头部组件
import DetailHeader from './childComps/DetailHeader'
import AlbumHeader from './childComps/AlbumHeader'
// 列表
import DetailList from './childComps/DetailList'

// 网络数据
import { SongList, getSongDetail, getUserDetail, getCommentPlayList, getPlayListDynamic, getSongs, getSongUrl } from '@/api/found/recommend'
import { getAlbum, getAlbumDynamic } from '@/api/found/singer'
export default {
  name: 'Detail',
  components: {
    DetailHeader,
    DetailList,
    AlbumHeader
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
      songs: [],
      // 标题
      title: ''
    }
  },
  async created() {
    let songIds = []
    this.title = this.$route.params.title
    if (this.title === '专辑') {
      // 专辑信息
      const album = await getAlbum(this.$route.params.id)
      if (album.code !== 200) return this.$message('error', '专辑信息获取失败')
      console.log(album.album)
      album.songs.forEach(item => {
        songIds.push(item.id)
      })
      this.playlist = album.album
      // 专辑动态
      const albumDynamic = await getAlbumDynamic(this.$route.params.id)
      if (albumDynamic.code !== 200) return this.$message('error', '专辑动态获取失败')
      console.log(albumDynamic)
      this.dynamicData = albumDynamic
    } else {
      // 获取歌单详情
      const { code, playlist, privileges } = await getSongDetail(this.$route.params.id)
      if (code !== 200) return this.$message('error', '歌单详情数据获取失败')
      this.playlist = playlist
      this.privileges = privileges
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
    }

    // 获取歌曲详情
    const songs = await getSongs(songIds)
    if (songs.code !== 200) return this.$message('error', '歌曲详情获取失败')
    // 获取歌曲url
    const songUrls = await getSongUrl(songIds)
    if (songUrls.code !== 200) return this.$message('error', '歌曲详情获取失败')
    this.songs = []
    songs.songs.forEach((item, index) => {
      const data = this.$_.find(songUrls.data, ['id', item.id])
      item.url = data.url
      item.type = data.type
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
.company {
      margin: 0;
      color: gray;
      font-size: 14px;
      white-space: pre-wrap;
    }
</style>
