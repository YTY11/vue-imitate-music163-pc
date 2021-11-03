<template>
  <div>
     <!-- 轮播图区域 -->
     <el-carousel  :interval="4000" type="card" height="180px">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img v-lazy="item.imageUrl" :alt="item.typeTitle" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <h3>推荐歌单</h3>
    <RecommendList @clickPlay="clickPlay" :list="result"/>
  </div>
</template>

<script>
// 推荐列表 组件
import RecommendList from '@/components/recommendList'

// 网络数据
import { getBanner, getPersonalized, getSongDetail } from '@/api/found/recommend'
export default {
  name: 'Personality',
  components: {
    RecommendList
  },
  data() {
    return {
      // 轮播图数据
      banners: [],
      // 推荐歌单数据
      result: []
    }
  },
  mounted() {
    this.getBanner()
    this.getPersonalized()
  },
  methods: {
    // 轮播图
    async getBanner() {
      const { code, banners } = await getBanner()
      if (code !== 200) return this.$message('error', '轮播图获取失败')
      this.banners = banners
    },
    // 推荐歌单
    async getPersonalized() {
      const { result, code } = await getPersonalized()
      if (code !== 200) return this.$message('error', '推荐歌单获取失败')
      this.result = result
    },
    // 监听点击的 歌单id 获取歌单详情
    async clickPlay(id) {
      this.$router.push({ name: 'Detail', params: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  min-height: 100%;
}
</style>
