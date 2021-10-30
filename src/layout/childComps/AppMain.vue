<template>
    <!-- 内容展示区域 -->
    <el-main>
      <el-backtop target=".el-main" bottom="60">
        <i class="iconfont icon-fanhuidingbu"></i>
      </el-backtop>
      <router-view />
    </el-main>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>

<style lang="scss" scoped>
// .el-scrollbar {
//   background-color: #eaedf1;
//   height: 100%;
  .el-main {
    height: calc(100vh - 60px);
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
