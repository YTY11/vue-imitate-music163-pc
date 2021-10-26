<template>
  <div class="right">
    <el-dropdown>
        <img src="~@/assets/img/un_user.png" alt="" />
        <i class="el-icon-arrow-down el-icon--right"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item divided>退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'Right'
}
</script>

<style lang="scss" scoped>
.right {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  .el-dropdown{
    display: flex;
    align-items: center;
  }
  img {
    width: 50px;
    height: 50px;
  }
}
</style>
