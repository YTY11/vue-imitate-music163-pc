<template>
  <div>
    <Tabbar class="tabbar" @activeTab="activeTab" :list="['推荐歌单','歌单']" />
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
      pathList: ['personality', 'songList']
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
