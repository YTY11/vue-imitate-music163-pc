<template>
  <div class="radio-Show-detail">
    <!-- 头部 -->
    <Top :info="info"/>
    <!-- 按钮区域 -->
    <el-button type="primary" class="el-icon-video-play" size="mini">播放{{playTime}}</el-button>
    <el-button class="iconfont icon-good" type="info" plain size="mini">({{likedCount}})</el-button>
    <el-button class="el-icon-edit-outline" type="info" plain size="mini">({{commentCount}})</el-button>
    <el-button class="el-icon-position" type="info" plain size="mini">({{shareCount}})</el-button>
    <el-button class="el-icon-bottom" type="info" plain size="mini">下载</el-button>
    <!-- 底部区域 -->
    <BottomInfo :detailData="detailData"/>
  </div>
</template>

<script>
import Top from './childComps/Top'
import BottomInfo from './childComps/BottomInfo'
// 秒数格式化
import { formatSeconds } from '@/utility/utils'
// 网络数据
import {
  getProgramDetail,
  DjData
} from '@/api/radio/radio'
import {
  getSongUrl
} from '@/api/found/recommend'
export default {
  name: 'RadioShowDetail',
  components: {
    Top,
    BottomInfo
  },
  data() {
    return {
      // 头部信息
      info: {},
      // 点赞数
      likedCount: 0,
      // 分享数据
      shareCount: 0,
      // 评论数
      commentCount: 0,
      // 播放时常
      playTime: '',
      // 详情数据
      detailData: {}
    }
  },
  created() {
    this.getProgramDetail(this.$route.params.id)
  },
  methods: {
    // 节目详情
    async getProgramDetail(id) {
      const { program, code } = await getProgramDetail(id)
      if (code !== 200) return this.$message('error', '节目详情获取失败')
      console.log(program)
      this.playTime = formatSeconds(program.duration / 1000, '', '时', '分', '秒')
      this.likedCount = program.likedCount
      this.shareCount = program.shareCount
      this.commentCount = program.commentCount
      this.info = {
        title: program.name,
        img: program.coverUrl,
        name: program.radio.name,
        subCount: program.radio.subCount
      }
      this.detailData = program
    }
  }
}
</script>

<style lang="scss" scoped>
.radio-Show-detail{
  .el-button{
    margin: 20px 0 0 10px;
  }
}
</style>
