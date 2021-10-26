<template>
  <div class="go">
    <i class="active el-icon-arrow-left"></i>
    <i class="active el-icon-arrow-right"></i>
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
  min-width: 80px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .active:hover{
    cursor: pointer;
  }
}
</style>
