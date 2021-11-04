<template>
  <div class="go">
    <i class="active el-icon-arrow-left" @click="$router.go(-1)"></i>
    <i class="active el-icon-arrow-right" @click="$router.go(1)"></i>
  </div>
</template>

<script>
export default {
  name: 'GoAndBack'
}
</script>

<style lang="scss" scoped>
.go{
  width: 80px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  white-space: nowrap;
  margin-left: 60px;
  .active:hover{
    cursor: pointer;
  }
  i{
    width: 40px;
  }
}
</style>
