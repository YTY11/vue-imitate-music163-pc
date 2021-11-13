<template>
  <div>
     <Tabbar :pathIndex="pathIndex" class="tabbar" @activeTab="activeTab" :list="['视频推荐','视频分类']" />
     <keep-alive>
      <router-view />
     </keep-alive>
  </div>
</template>

<script>
// tabbar
import Tabbar from '@/components/tabbar'

// 网络数据
import { getVideoGroupList, getVideoGroup, getVideoTimelineAll } from '@/api/video/video'
export default {
  name: 'Video',
  components: {
    Tabbar
  },
  data() {
    return {
      pathList: ['VideoRecommend', 'VideoGroup'],
      pathIndex: 0
    }
  },
  watch: {
  // 监听路由变化
    $route: {
      handler(newD, oldD) {
        const a = this.pathList.indexOf(newD.name)
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
      this.$router.push('/video/' + this.pathList[index])
    }
  }
}
</script>
