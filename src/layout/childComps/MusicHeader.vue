<template>
  <el-header>
    <!-- logo -->
    <Logo/>
    <!-- 前进后退 -->
    <GoAndBack/>
    <!-- 搜索 -->
    <Seek/>
    <!-- 右侧区域 -->
    <Right class="right"/>
  </el-header>
</template>

<script>
// logo 组件
import Logo from './headerChilds/Logo'
// 前进后退
import GoAndBack from './headerChilds/GoAndBack'
// 搜索
import Seek from './headerChilds/Seek'
// 右侧区域
import Right from './headerChilds/Right'
export default {
  name: 'MusicHeader',
  components: {
    Logo,
    GoAndBack,
    Seek,
    Right
  }
}
</script>

<style lang="scss" scoped>
.el-header{
  display: flex;
  align-items: center;
  background: grey;
  .right{
    flex: 1;
  }
}
</style>
