<template>
  <div>
    <Tabbar :pathIndex="pathIndex" class="tabbar" @activeTab="activeTab" :list="['网易出品','分类', '排行榜', '最新MV']" />
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
// tabbar
import Tabbar from '@/components/tabbar'
export default {
  name: 'MV',
  components: {
    Tabbar
  },
  data() {
    return {
      pathList: ['Netease', 'Classify', 'RankingList', 'Singer'],
      pathIndex: 0
    }
  },
  watch: {
    // 监听路由变化
    $route: {
      handler(newD, oldD) {
        const a = this.pathList.indexOf(newD.name)
        console.log(a)
        if (a >= 0) {
          this.pathIndex = a
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 选择
    activeTab(index) {
      this.$router.push('/MV/' + this.pathList[index])
      console.log(index)
    }
  }
}
</script>
