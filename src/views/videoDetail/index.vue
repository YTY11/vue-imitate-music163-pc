<template>
  <el-card class="video">
    <!-- 左侧 -->
    <Left  class="left"
    @pageChange="pageChange"
    :playerOptions="playerOptions"
    :videoDetail="videoDetail"
    :videoDetailInfo="videoDetailInfo"
    :commentsInfo="commentsInfo" :getCommentInfo="getCommentVideoInfo"
    />
    <!-- 右侧 -->
    <Right class="right" :videoDetail="videoDetail" :relatedAllvideo="relatedAllvideo"></Right>
  </el-card>
</template>

<script>
import Left from '@/components/video/Left'
import Right from '@/components/video/Right'
// 网络数据
import { getRelatedAllvideo, getVideoDetail, getVideoUrl, getVideoDetailInfo, getCommentVideo } from '@/api/video/video'
export default {
  name: 'VideoDetail',
  components: {
    Left,
    Right
  },
  data() {
    return {
      // 视频id
      vid: '',
      // 视频播放数据
      playerOptions: {
        language: 'zh-CN',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'video/mp4',
            src: ''
          }
        ],
        poster: '',
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      },
      // 视频详情
      videoDetail: {},
      // 视频点赞转发评论数数据
      videoDetailInfo: {},
      // 获取评论数据参数
      getCommentVideoInfo: {
        id: '',
        pagesize: 20,
        pagenum: 1
      },
      // 评论数据
      commentsInfo: {},
      // 相关视频
      relatedAllvideo: []
    }
  },
  watch: {
    // 监听路由参数变化刷新页面
    $route(to, from) {
      this.$router.go()
    }
  },
  created() {
    this.vid = this.$route.params.id
    console.log(this.vid)
    this.getVideoDetail(this.vid)
    this.getVideoUrl(this.vid)
    this.getVideoDetailInfo(this.vid)
    this.getCommentVideoInfo.id = this.vid
    this.getCommentVideo(this.getCommentVideoInfo)
    this.getRelatedAllvideo(this.vid)
  },
  methods: {
    // 获取视频详细
    async getVideoDetail(id) {
      const { code, data } = await getVideoDetail(id)
      if (code !== 200) return this.$message('error', '视频详细获取失败')
      this.playerOptions.poster = data.coverUrl
      this.videoDetail = data
    },
    // 获取视频Url播放地址
    async getVideoUrl(id) {
      const { code, urls } = await getVideoUrl(id)
      if (code !== 200) return this.$message('error', '视频播放地址获取失败')
      this.playerOptions.sources[0].src = urls[0].url
    },
    // 获取视频点赞转发评论数数据
    async getVideoDetailInfo(id) {
      const data = await getVideoDetailInfo(id)
      if (data.code !== 200) return this.$message('error', '点赞转发评论数数据获取失败')
      this.videoDetailInfo = data
    },
    // 获取视频点赞转发评论数数据
    async getCommentVideo(info) {
      const data = await getCommentVideo(info)
      if (data.code !== 200) return this.$message('error', 'MV 评论获取失败')
      this.commentsInfo = data
    },
    // 获取相关视频
    async getRelatedAllvideo(id) {
      const { code, data } = await getRelatedAllvideo(id)
      if (code !== 200) return this.$message('error', '相关推荐获取失败')
      this.relatedAllvideo = this.$_.take(data, 6)
      console.log(data)
    },
    // 页码变化 数据更新
    pageChange(info) {
      this.getCommentVideo(info)
    }
  }
}
</script>
<style lang="scss" scoped>
.video {
  width: 100%;
  .left{
    width: 70%;
  }
  .right {
    width: 30%;
  }
}
::v-deep .el-card__body{
  display: flex;
}
</style>
