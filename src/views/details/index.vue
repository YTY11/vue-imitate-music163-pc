<template>
  <div class="detail">
     <!-- 头部 -->
     <AlbumHeader :songs="songs" :dynamicData="dynamicData" :playlist="playlist" v-if="title === '专辑'"/>
     <DetailHeader v-else :songs="songs" :dynamicData="dynamicData" :commitPlayList="commitPlayList" :profile="profile" :playlist="playlist"/>
     <el-collapse v-if="title === '专辑'">
      <el-collapse-item title="专辑介绍: ">
        <p  class="company" v-html="playlist.description"></p>
      </el-collapse-item>
     </el-collapse>
     <!-- 列表 -->
     <DetailList :songs="songs" :dynamicData="dynamicData" :playlist="playlist"/>
     <!-- 评论 -->
     <Comment :commentsInfo="commitPlayList" :getCommentInfo="commitInfo"/>
     <!-- 分页 -->
     <Pagination
    @updataData="pageChange"
      :queryInfo="commitInfo"
      :device="device"
      :total="commitPlayList.total"
      :pageSizes="[20, 30, 50, 100]"
    />
  </div>
</template>

<script>
// 头部组件
import DetailHeader from './childComps/DetailHeader'
import AlbumHeader from './childComps/AlbumHeader'
// 列表
import DetailList from './childComps/DetailList'
// 评论
import Comment from '@/components/comment'
// 分页
import Pagination from '@/components/pagination'
// 网络数据
import { SongList, getSongDetail, getUserDetail, getCommentPlayList, getCommentAlbum, getPlayListDynamic, getSongs, getSongUrl } from '@/api/found/recommend'
import { getAlbum, getAlbumDynamic } from '@/api/found/singer'
export default {
  name: 'Detail',
  components: {
    DetailHeader,
    DetailList,
    AlbumHeader,
    Comment,
    Pagination
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
        pagesize: 20,
        pagenum: 1 // 页码
      },
      // 歌单详情动态
      dynamicData: {},
      // 歌曲详情
      songs: [],
      // 标题
      title: '',
      id: '',
      // 歌曲ids
      songIds: '',
      // 未格式化的songs
      songsOld: [],
      songUrls: []
    }
  },
  computed: {
    device() {
      return this.$store.state.app.device === 'desktop'
    }
  },
  async created() {
    this.id = this.$route.params.id
    this.title = this.$route.params.title
    if (this.title === '专辑') {
      // 专辑信息
      this.getAlbum(this.id)
      // 专辑动态
      this.getAlbumDynamic(this.id)
      // 获取专辑评论数据
      this.commitInfo.id = this.id
      this.getCommentAlbum(this.commitInfo)
    } else {
      // 获取歌单详情
      this.getSongDetail(this.id)
      // 歌单详情动态
      this.getPlayListDynamic(this.id)
      // 获取歌单评论数据
      this.commitInfo.id = this.id
      this.getCommentPlayList(this.commitInfo)
    }
  },
  methods: {
    async getAlbum(id) {
      this.songIds = ''
      const ids = []
      // 专辑信息
      const album = await getAlbum(id)
      if (album.code !== 200) return this.$message('error', '专辑信息获取失败')
      console.log(album.album)
      album.songs.forEach(item => {
        ids.push(item.id)
      })
      this.songIds = ids.join(',')
      this.playlist = album.album
      this.songs = []
      this.getSongs(this.songIds)
    },
    // 专辑动态
    async getAlbumDynamic(id) {
      const albumDynamic = await getAlbumDynamic(id)
      if (albumDynamic.code !== 200) return this.$message('error', '专辑动态获取失败')
      console.log(albumDynamic)
      this.dynamicData = albumDynamic
    },
    // 获取专辑评论数据
    async getCommentAlbum(commitInfo) {
      const data = await getCommentAlbum(commitInfo)
      if (data.code !== 200) return this.$message('error', '歌单评论信息获取失败')
      this.commitPlayList = data
    },
    // 获取歌曲详情
    async getSongs(ids) {
      const songs = await getSongs(ids)
      if (songs.code !== 200) return this.$message('error', '歌曲详情获取失败')
      this.songsOld = songs
      this.getSongUrl(ids)
    },
    // 获取歌曲url
    async getSongUrl(ids) {
      const songUrls = await getSongUrl(ids)
      if (songUrls.code !== 200) return this.$message('error', '歌曲url获取失败')
      this.songUrls = songUrls
      this.songsOld.songs.forEach((item, index) => {
        const data = this.$_.find(this.songUrls.data, ['id', item.id])
        item.url = data.url
        item.type = data.type
        this.songs.push(new SongList(item))
      })
    },
    // 获取歌单详情
    async getSongDetail(id) {
      const ids = []
      const { code, playlist, privileges } = await getSongDetail(id)
      if (code !== 200) return this.$message('error', '歌单详情数据获取失败')
      this.playlist = playlist
      this.privileges = privileges
      playlist.trackIds.forEach(item => {
        ids.push(item.id)
      })
      this.songIds = ids.join(',')
      // this.playlist = album.album
      this.songs = []
      this.getSongs(this.songIds)
      // 获取用户信息
      this.getUserDetail(this.playlist.userId)
    },
    // 歌单详情动态
    async getPlayListDynamic(id) {
      const dynamicData = await getPlayListDynamic(id)
      if (dynamicData.code !== 200) return this.$message('error', '歌单详情动态数据获取失败')
      this.dynamicData = dynamicData
    },
    // 获取用户信息
    async getUserDetail(userId) {
      const { code: status, profile } = await getUserDetail(userId)
      if (status !== 200) return this.$message('error', '用户信息获取失败')
      this.profile = profile
    },
    // 获取歌单评论数据
    async getCommentPlayList(info) {
      const data = await getCommentPlayList(info)
      if (data.code !== 200) return this.$message('error', '歌单评论信息获取失败')
      this.commitPlayList = data
    },
    // 页码改变跟新数据
    pageChange(info) {
      console.log(info)
      if (this.title === '专辑') {
        this.getCommentAlbum(info)
      } else {
        this.getCommentPlayList(info)
      }
    }
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
