<template>
  <div class="detail">
     <!-- 头部 -->
     <DetailHeader :commitPlayList="commitPlayList" :profile="profile" :playlist="playlist"/>
     <!-- 列表 -->
     <DetailList :playlist="playlist"/>
  </div>
</template>

<script>
// 头部组件
import DetailHeader from './childComps/DetailHeader'
// 列表
import DetailList from './childComps/DetailList'

// 网络数据
import { getSongDetail, getUserDetail, getCommentPlayList } from '@/api/found/recommend'
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
      }
    }
  },
  async created() {
    // 获取歌单详情
    const { code, playlist, privileges } = await getSongDetail(this.$route.params.id)
    if (code !== 200) return this.$message('error', '歌单详情数据获取失败')

    // 获取用户信息
    const { code: status, profile } = await getUserDetail(playlist.userId)
    if (status !== 200) return this.$message('error', '用户信息获取失败')

    // 获取评论数据
    this.commitInfo.id = playlist.id
    const data = await getCommentPlayList(this.commitInfo)
    if (data.code !== 200) return this.$message('error', '评论信息获取失败')
    this.commitPlayList = data
    console.log(data)
    console.log(profile)
    this.profile = profile
    this.playlist = playlist
    this.privileges = privileges
    console.log(playlist)
    console.log(privileges)
  }
}
</script>

<style lang="scss" scoped>
// .detail{
// }
</style>
