<template>
  <div>
    <Tabbar @activeTab="activeTab" :list="['推荐歌单']"/>
     <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in banners" :key="item">
      <img :src="item.imageUrl" :alt="item.typeTitle">
    </el-carousel-item>
  </el-carousel>
  </div>
</template>

<script>
// tabbar
import Tabbar from '@/components/tabbar'

// 网络数据
import { getBanner, getMvData } from '@/api/found/recommend'
export default {
  name: 'Found',
  components: {
    Tabbar
  },
  data() {
    return {
      banners: []
    }
  },
  mounted() {
    this.getBanner()
  },
  methods: {
    // 轮播图
    async getBanner() {
      const { code, banners } = await getBanner()
      if (code !== 200) return this.$message('error', '轮播图获取失败')
      console.log(banners)
      this.banners = banners
    },
    // 选择
    activeTab(index) {
      console.log(index)
    }
  }
}
</script>
