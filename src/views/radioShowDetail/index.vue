<template>
  <div class="radio-Show-detail">
    <div class="left">
      <!-- 头部 -->
      <Top :info="info"/>
      <!-- 按钮区域 -->
      <el-button type="primary" class="el-icon-video-play" size="mini" @click="playDj">播放{{playTime}}</el-button>
      <el-button class="iconfont icon-good" type="info" plain size="mini">({{likedCount}})</el-button>
      <el-button class="el-icon-edit-outline" type="info" plain size="mini">({{commentCount}})</el-button>
      <el-button class="el-icon-position" type="info" plain size="mini">({{shareCount}})</el-button>
      <el-button class="el-icon-bottom" type="info" plain size="mini">下载</el-button>
      <!-- 底部区域 -->
      <BottomInfo :detailData="detailData"/>
    </div>
    <div class="right">
      <div class="right-title">
        <h3>更多节目</h3>
        <span>更多></span>
      </div>
      <el-divider></el-divider>
      <div @click="goNewDj(item.id)" class="more-item" v-for="item in moreDjShow" :key="item.id">
        <img v-lazy="item.coverUrl" alt="">
        <div class="item-info">
          <span>{{item.name}}</span>
          <span>{{item.radio.name}}</span>
        </div>
      </div>
    </div>
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
  DjData,
  getDjProgram
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
      detailData: {},
      // 更多节目参数
      djProgramParams: {
        rid: '',
        pagesize: 5,
        pagenum: 1
      },
      // 更多节目数据
      moreDjShow: []
    }
  },
  watch: {
    $route() {
      this.$router.go()
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
      this.djProgramParams.rid = program.radio.id
      // 更多节目
      this.getDjProgram(this.djProgramParams)
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
    },
    // 播放
    async playDj() {
      // 播放地址
      const { code: status, data } = await getSongUrl(this.detailData.mainTrackId)
      if (status !== 200) return this.$message('error', '播放地址获取失败')
      const djData = {}
      djData.id = this.detailData.mainTrackId // id
      djData.url = data[0].url // id
      djData.name = this.detailData.name // 节目名
      djData.artist = this.detailData.radio.name // 电台名
      djData.type = data[0].type // type
      djData.pic = this.detailData.coverUrl // 图片
      djData.time = formatSeconds(this.detailData.duration / 1000) // 图片
      const playData = new DjData(djData)
      this.$bus.$emit('clickPlay', { songs: [playData], index: 0 })
    },
    // 更多节目
    async getDjProgram(info) {
      const { programs, code } = await getDjProgram(info)
      if (code !== 200) return this.$message('error', '更多节目获取失败')
      this.moreDjShow = programs
      console.log(programs)
    },
    // 选择新的dj 节目
    goNewDj(id) {
      this.$router.push({ name: 'RadioShowDetail', params: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.radio-Show-detail{
  width: 100%;
  display: flex;
  .left{
    width: 70%;
    .el-button{
      margin: 20px 0 0 10px;
    }
  }
  .right{
    border-left: 1px solid #DCDFE6;
    box-sizing: border-box;
    width: 30%;
    margin-left: 20px;
    padding-left: 20px;
    .el-divider{
      margin: 5px 0;
    }
    .right-title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      h3{
        margin: 0;
        &:hover{
          cursor: pointer;
          border-bottom: 1px solid black;
        }
      }
      span{
        font-size: 14px;
        color: gray;
        &:hover{
          cursor: pointer;
          border-bottom: 1px solid gray;
        }
      }
    }
    .more-item{
      &:hover{
        cursor: pointer;
      }
      margin: 20px 0;
      display: flex;
      img{
        width: 50px;
        height: 50px;
        border-radius: 5px;
      }
      .item-info{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        overflow: hidden;
        span{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        :nth-child(2) {
          color: gray;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
