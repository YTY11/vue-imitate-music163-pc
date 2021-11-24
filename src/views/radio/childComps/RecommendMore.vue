<template>
  <div class="recommend-more">
    <More title="推荐节目" :list="recommend"/>
  </div>
</template>

<script>
import More from './More'

// 网络数据
import { getProgramRecommend } from '@/api/radio/radio'
export default {
  name: 'RecommendMore',
  components: {
    More
  },
  data() {
    return {
      // 推荐节目数据
      recommend: []
    }
  },
  created() {
    this.getProgramRecommend(50)
  },
  methods: {
    // 推荐节目
    async getProgramRecommend(limit) {
      const { programs, code } = await getProgramRecommend(limit)
      if (code !== 200) return this.$message('error', '推荐节目获取失败')
      console.log(programs)
      this.recommend = programs
    }
  }
}
</script>
