<template>
  <el-card class="video">
    <!-- 左侧 -->
    <Left @pageChange="pageChange" class="left" :commentsInfo="commentsInfo" :getCommentInfo="getCommentInfo" :playerOptions="playerOptions" :mvDetail="mvDetail" :mvInfo="mvInfo" :MvDetailInfo="MvDetailInfo"/>
    <!-- 右侧 -->
    <Right class="right" :mvDetail="mvDetail" :simisMvs="simisMvs"></Right>
  </el-card>
</template>

<script>
import Left from './childComps/Left'
import Right from './childComps/Right'
// 网络数据
import { getMvInfo, getMvDetail, getMvDetailInfo, getSimiMv, getCommentMv } from '@/api/found/singer'
export default {
  name: 'MvDetail',
  components: {
    Left,
    Right
  },
  data() {
    return {
      // MV播放数据
      playerOptions: {
        language: 'zh-CN',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'video/mp4',
            src: ''
          }
        ],
        poster: '/static/images/author.jpg',
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      },
      // 详情
      mvDetail: {},
      // 播放地址
      mvInfo: {},
      // 点赞品论数等数据
      MvDetailInfo: {},
      // 相似MV
      simisMvs: [],
      // 获取评论的参数
      getCommentInfo: {
        id: '',
        pagesize: 20,
        pagenum: 1
      },
      // 评论信息
      commentsInfo: {}
    }
  },
  watch: {
    // 监听路由参数变化刷新页面
    $route(to, from) {
      this.$router.go()
    }
  },
  created() {
    this.getMvInfo(this.$route.params.id)
    this.getMvDetail(this.$route.params.id)
    this.getMvDetailInfo(this.$route.params.id)
    this.getSimiMv(this.$route.params.id)
    this.getCommentInfo.id = this.$route.params.id
    this.getCommentMv(this.getCommentInfo)
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    // MV url
    async getMvInfo(id) {
      const { data, code } = await getMvInfo(id)
      if (code !== 200) return this.$message('error', 'MV播放资源获取失败')
      this.playerOptions.sources[0].src = data.url
      console.log(data)
    },
    // 获取对应 MV 数据 , 数据包含 mv 名字 , 歌手 , 发布时间
    async getMvDetail(id) {
      const { data, code } = await getMvDetail(id)
      if (code !== 200) return this.$message('error', 'MV 数据获取失败')
      this.playerOptions.poster = data.cover
      this.mvDetail = data
      console.log(data)
    },
    // 获取 mv 点赞转发评论数数据
    async getMvDetailInfo(id) {
      const data = await getMvDetailInfo(id)
      if (data.code !== 200) return this.$message('error', 'MV 点赞转发评论数数据获取失败')
      console.log(data)
      this.MvDetailInfo = data
    },
    // 获取相似mv
    async getSimiMv(id) {
      const { code, mvs } = await getSimiMv(id)
      if (code !== 200) return this.$message('error', '相关推荐获取失败')
      this.simisMvs = this.$_.take(mvs, 6)
      console.log(mvs)
    },
    // 获取MV 评论
    async getCommentMv(info) {
      const data = await getCommentMv(info)
      if (data.code !== 200) return this.$message('error', 'MV 评论获取失败')
      console.log(data)
      this.commentsInfo = data
    },
    // 页码变化 数据更新
    pageChange(info) {
      console.log(info)
      this.getCommentMv(info)
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
