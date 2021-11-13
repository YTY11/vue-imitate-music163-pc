<template>
  <div class="video-group">
    <!-- 标签 -->
    <NavBar class="nav-bar" @active="selectGroup"  :list="groupList"/>
    <VideoItem :list="videoList" @playVideo="playVideo"/>
    <div class="page">
      <el-button type="primary" :disabled="paramsInfo.pagenum === 4" size="mini" @click="updataQueryInfo(-1)">上一页</el-button>
     <el-button type="primary" size="mini" @click="updataQueryInfo(1)">下一页</el-button>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/navbar'
import VideoItem from '@/components/video'
// 网络数据
import { getVideoGroupList, getVideoGroup, getVideoTimelineAll } from '@/api/video/video'
export default {
  name: 'VideoGroup',
  components: {
    NavBar,
    VideoItem
  },
  data() {
    return {
      // 标签列表
      groupList: [],
      // 标签ids
      groupIds: [],
      // 获取数据参数
      paramsInfo: {
        id: '',
        pagesize: 24,
        pagenum: 1
      },
      // 视频列表
      videoList: [],
      id: 0

    }
  },
  created() {
    this.getVideoGroupList()
    this.getVideoTimelineAll(1, this.paramsInfo)
  },
  methods: {
    // 获取视频标签列表
    async getVideoGroupList() {
      const { code, data } = await getVideoGroupList()
      if (code !== 200) return this.$message('error', '视频标签获取失败')
      this.groupList = ['全部']
      this.groupIds = [0]
      data.forEach(item => {
        this.groupList.push(item.name)
        this.groupIds.push(item.id)
      })
    },
    // 获取视频标签下的视频
    async getVideoGroup(status, info) {
      this.videoList = []
      for (let i = 0; i < 3; i++) {
        if (status === 1) {
          info.pagenum++
        } else {
          info.pagenum--
        }
        const { datas, code } = await getVideoGroup(info)
        if (code !== 200) return this.$message('error', '视频列表获取失败')
        this.videoList.push(...datas)
      }
    },
    // 获取全部视频列表
    async getVideoTimelineAll(status, info) {
      this.videoList = []
      for (let i = 0; i < 3; i++) {
        if (status === 1) {
          info.pagenum++
        } else {
          info.pagenum--
        }
        const { datas, code } = await getVideoTimelineAll(info)
        if (code !== 200) return this.$message('error', '视频列表获取失败')
        this.videoList.push(...datas)
      }
    },
    // 选择的标签
    selectGroup(id) {
      this.paramsInfo = {
        id: '',
        pagesize: 24,
        pagenum: 1
      }
      const groupId = this.groupIds[id]
      this.id = groupId
      if (groupId === 0) {
        this.getVideoTimelineAll(1, this.paramsInfo)
      } else {
        this.paramsInfo.id = groupId
        this.getVideoGroup(1, this.paramsInfo)
      }
      console.log(groupId)
    },
    // 播放视频
    playVideo(id) {
      this.$router.push({ name: 'VideoDetail', params: { id } })
    },
    // 页码改变数据更新
    updataQueryInfo(status) {
      console.log(status)
      if (this.id === 0) {
        this.getVideoTimelineAll(status, this.paramsInfo)
      } else {
        this.getVideoGroup(status, this.paramsInfo)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.video-group{
  margin-top: 20px;
  .nav-bar{
    line-height: 25px;
  }
   .page{
    display: flex;
    margin: 20px 0;
    justify-content: space-evenly;
  }
}
</style>
