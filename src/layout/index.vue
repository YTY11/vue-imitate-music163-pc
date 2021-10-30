<template>
  <el-container class="layout">
    <!-- 头部区域 -->
    <MusicHeader/>
    <el-container>
    <!-- 侧边导航区域 -->
    <NavMenu class="nav-menu"/>
    <!-- 内容区域 -->
    <AppMain/>
     </el-container>
    <!-- 底部区域 -->
    <Footer/>
  </el-container>
</template>

<script>
// 头部组件
import MusicHeader from './childComps/MusicHeader'
// mian 组件
import AppMain from './childComps/AppMain'
// 侧边导航组件
import NavMenu from './childComps/NavMenu'
// 底部组件
import Footer from './childComps/Footer'

import resizeHander from '@/mixin/resizeHander'
export default {
  name: 'Layout',
  components: {
    AppMain,
    MusicHeader,
    NavMenu,
    Footer
  },
  mixins: [resizeHander],
  computed: {
    // 判断PC 还是 移动
    device() {
      return this.$store.state.app.device === 'desktop'
    },
    // 侧边栏是否显示
    collapse() {
      return this.$store.state.app.isCollapse
    }
  }

}
</script>

<style lang="scss" scoped>
.layout{
  flex-direction: column;
  height: 100%;
  .nav-menu{
    background: #808080;
  }
}

</style>
