<template>
  <el-header :style="{'padding-left': !device ? 0 : ''}">
    <!-- logo -->
    <Logo/>
    <!-- 前进后退 -->
    <GoAndBack v-if="device"/>
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
  },
  computed: {
    // 判断PC 还是 移动
    device() {
      return this.$store.state.app.device === 'desktop'
    }
  },
  methods: {
    // 关闭遮罩层
    closeModal() {
      this.$store.commit('app/SET_COLLAPSE', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header{
  color: #000;
  display: flex;
  align-items: center;
  background: #F9F9F9;
  .right{
    flex: 1;
  }
}
</style>
