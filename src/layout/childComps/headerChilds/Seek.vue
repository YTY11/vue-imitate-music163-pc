<template>
  <el-input
    prefix-icon="el-icon-search"
    v-model="seekData"
    placeholder="搜索"
  ></el-input>
</template>

<script>
export default {
  name: 'Seek',
  data() {
    return {
      seekData: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.el-input {
  width: 150px;
  min-width: 100px;
  height: 30px;
  margin-left: 60px;
}
::v-deep .el-input__inner {
  height: 30px !important;
  line-height: 30px !important;
  border: 0;
  border-radius: 20px;
}
::v-deep .el-input__icon {
  line-height: 30px !important;
}
</style>
