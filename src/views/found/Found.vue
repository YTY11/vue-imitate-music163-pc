<template>
  <div>
    <Tabbar :pathIndex="pathIndex" class="tabbar" @activeTab="activeTab" :list="['个性推荐','歌单', '排行榜']" />
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
      pathList: ['personality', 'songList', 'rankingList'],
      pathIndex: 0
    }
  },
  created() {
    // 刷新页面时判断路径 确认选择的导航
    this.pathList.forEach((item, index) => {
      const a = this.$route.path.indexOf(item)
      if (a > 0) {
        this.pathIndex = index
      }
    })
    console.log(this.$route.path)
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
