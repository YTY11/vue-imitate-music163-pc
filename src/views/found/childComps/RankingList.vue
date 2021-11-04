<template>
  <div class="ranking">
    <h3>云音乐特色榜</h3>
    <RecommendList :list="list1" @clickPlay="clickPlay"/>
    <h3>全球媒体榜</h3>
    <RecommendList :list="list2" @clickPlay="clickPlay"/>
  </div>
</template>

<script>
import RecommendList from '@/components/recommendList'

// 网络数据
import { getToplist } from '@/api/found/recommend'
export default {
  name: 'RankingList',
  components: {
    RecommendList
  },
  data() {
    return {
      // 云音乐特色榜列表
      list1: [],
      // 全球媒体榜
      list2: []
    }
  },
  created() {
    this.getToplist()
  },
  methods: {
    // 获取所有排行榜
    async getToplist() {
      const { code, list } = await getToplist()
      if (code !== 200) return this.$message('error', '排行榜获取失败')
      console.log(list)
      this.list1 = this.$_.take(list, 4)
      this.list2 = this.$_.takeRight(list, list.length - 4)
    },
    // 监听点击
    clickPlay(id) {
      this.$router.push({ name: 'Detail', params: { id } })
    }
  }
}
</script>
