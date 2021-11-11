<template>
    <!-- 内容展示区域 -->
    <el-main>
      <el-backtop target=".el-main" :bottom="150">
        <i class="iconfont icon-fanhuidingbu"></i>
      </el-backtop>
      <router-view :key="key"/>
    </el-main>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + new Date()
        : this.$route + new Date()
    }
  }
}
</script>

<style lang="scss" scoped>
// .el-scrollbar {
//   background-color: #eaedf1;
//   height: 100%;
  .el-main {
    padding: 15px;
  }
  .el-backtop{
    color: #F45252;
    width: 50px;
    height: 50px;
    i{
      font-size: 30px;
    }
  }
// }
</style>
