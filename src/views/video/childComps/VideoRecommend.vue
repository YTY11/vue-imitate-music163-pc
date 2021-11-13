<template>
  <div class="recommend">
    <VideoItem :list="videoList" @playVideo="playVideo"/>
    <div class="page">
      <el-button type="primary" :disabled="paramsInfo.pagenum === 4" size="mini" @click="updataQueryInfo(-1)">上一页</el-button>
     <el-button type="primary" size="mini" @click="updataQueryInfo(1)">下一页</el-button>
    </div>
  </div>
</template>

<script>
import VideoItem from '@/components/video'
// 网络数据
import { getVideoTimelineRecommend } from '@/api/video/video'
export default {
  name: 'VideoRecommend',
  components: {
    VideoItem
  },
  data() {
    return {
      // 获取数据参数
      paramsInfo: {
        pagesize: 24,
        pagenum: 1
      },
      // 视频列表
      videoList: []
    }
  },
  created() {
    this.getVideoTimelineRecommend(1, this.paramsInfo)
  },
  methods: {
    // 获取推荐视频
    async getVideoTimelineRecommend(status, info) {
      this.videoList = []
      for (let i = 0; i < 3; i++) {
        if (status === 1) {
          info.pagenum++
        } else {
          info.pagenum--
        }
        const { code, datas } = await getVideoTimelineRecommend(info)
        if (code !== 200) return this.$message('error', '推荐视频数据获取失败')
        console.log(datas)
        this.videoList.push(...datas)
      }
    },
    // 播放视频
    playVideo(id) {
      this.$router.push({ name: 'VideoDetail', params: { id } })
    },
    // 页码改变数据更新
    updataQueryInfo(status) {
      console.log(status)
      this.getVideoTimelineRecommend(status, this.paramsInfo)
    }

  }
}
</script>

<style lang="scss" scoped>
.recommend{
  margin-top: 20px;
  .page{
    display: flex;
    margin: 20px 0;
    justify-content: space-evenly;
  }
}
</style>
