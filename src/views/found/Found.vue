<template>
  <div>
    <Tabbar :pathIndex="pathIndex" class="tabbar" @activeTab="activeTab" :list="['个性推荐','歌单', '排行榜', '歌手']" />
    <keep-alive>
    <router-view/>
    </keep-alive>
  </div>
</template>

<script>
// tabbar
import Tabbar from '@/components/tabbar'

export default {
  name: 'Found',
  components: {
    Tabbar
  },
  data() {
    return {
      pathList: ['Personality', 'SongList', 'RankingList', 'Singer'],
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
      this.$router.push('/found/' + this.pathList[index])
      console.log(index)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabbar{
  margin-bottom: 20px;
}

</style>
