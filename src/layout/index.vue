<template>
  <el-container class="index">
    <!-- 头部区域 -->
    <MusicHeader/>
    <el-container>
    <!-- 侧边导航区域 -->
    <NavMenu/>
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
export default {
  name: 'Layout',
  components: {
    AppMain,
    MusicHeader,
    NavMenu,
    Footer
  }
}
</script>

<style lang="scss" scoped>
.index{
  flex-direction: column;
  height: 100%;
}
</style>
