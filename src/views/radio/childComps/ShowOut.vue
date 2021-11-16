<template>
  <div class="show-out">
    <More title="节目排行榜" :list="toplist"/>
  </div>
</template>

<script>
import More from './More'

// 网络数据
import {
  getProgramToplist
} from '@/api/radio/radio'
export default {
  name: 'ShowOut',
  components: {
    More
  },
  data() {
    return {
      // 获取节目榜参数
      topListParams: {
        pagesize: 100,
        pagenum: 1
      },
      // 节目榜数据
      toplist: []
    }
  },
  created() {
    this.getProgramToplist(this.topListParams)
  },
  methods: {
    // 节目榜
    async getProgramToplist(info) {
      const { toplist, code } = await getProgramToplist(info)
      if (code !== 200) return this.$message('error', '推荐节目获取失败')
      console.log(toplist)
      this.toplist = toplist
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
