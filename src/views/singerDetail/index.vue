<template>
  <div class="detail">
    <!-- 头部 -->
    <SingerHeader :artist="artist"/>
    <el-tabs type="border-card">
      <el-tab-pane label="热门作品">
        <el-button @click="clickPlay" type="danger" class="el-icon-video-play" size="small">播放</el-button>
         <!-- 列表 -->
          <el-table
            :data="hotSongs"
            stripe
            style="width: 100%"
            @current-change="handleCurrentChange"
          >
            <el-table-column label="#" type="index"> </el-table-column>
            <el-table-column label="操作" width="50">
              <template>
                <i class="iconfont icon-bofang01-xianxing"></i>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="歌曲标题"> </el-table-column>
            <el-table-column prop="time" label="时常"> </el-table-column>
            <el-table-column prop="artist" label="歌手"> </el-table-column>
            <el-table-column prop="album" label="专辑"> </el-table-column>
          </el-table>
      </el-tab-pane>
      <el-tab-pane label="所有专辑">
        <SingerList @selectSinger="selectSinger" :list="albums"/>
      </el-tab-pane>
      <el-tab-pane label="相关MV">相关MV</el-tab-pane>
      <el-tab-pane label="艺人详情">艺人详情</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SingerHeader from './childComps/SingerHeader'
import SingerList from '@/components/singerList'
// 网络数据
import { getArtists, getArtistAlbum } from '@/api/found/singer'
import { SongList, getSongs, getSongUrl } from '@/api/found/recommend'
export default {
  name: 'SingerDetail',
  components: {
    SingerHeader,
    SingerList
  },
  data() {
    return {
      // 歌手简单信息
      artist: {},
      // 热门歌曲
      hotSongs: [],
      // 专辑
      albums: [],
      getAlbumInfo: {
        id: '', // 歌手id
        limit: 30, // 每页条数
        offset: 0 // 页码
      }
    }
  },
  created() {
    this.getArtists(this.$route.params.id)
  },
  methods: {
    // 歌手单曲 歌手信息
    async getArtists(id) {
      const { code, hotSongs, artist } = await getArtists(id)
      if (code !== 200) return this.$message('error', '获取歌手信息失败')
      this.artist = artist
      this.hotSongs = []
      let songIds = []
      hotSongs.forEach(item => {
        songIds.push(item.id)
      })
      songIds = songIds.join(',')

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
        this.hotSongs.push(new SongList(item))
      })

      // 获取专辑
      this.getAlbumInfo.id = id
      const albums = await getArtistAlbum(this.getAlbumInfo)
      if (albums.code !== 200) return this.$message('error', '获取专辑失败')
      console.log(albums.hotAlbums)
      this.albums = albums.hotAlbums
    },
    // 选择的歌曲
    handleCurrentChange(val) {
      const data = {}
      data.index = this.$_.findIndex(this.hotSongs, { id: val.id })
      data.songs = this.hotSongs
      this.$bus.$emit('clickPlay', data)
    },
    // 播放
    clickPlay() {
      const data = {}
      data.index = 0
      data.songs = this.hotSongs
      this.$bus.$emit('clickPlay', data)
    },
    // 选择的专辑
    selectSinger(id) {
      console.log(id)
      const title = '专辑'
      this.$router.push({ name: 'Detail', params: { id, title } })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tabs{
  margin-top: 20px;
}
::v-deep .el-tabs__item.is-active {
    color: red !important;
}
::v-deep .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
    color: red !important;
}
</style>
