<template>
  <div class="top">
    <img v-lazy="info.img" alt="" />
    <div class="info">
      <div class="radio-show">
        <p>电台节目 ·</p>
        <p>{{ info.title }}</p>
      </div>
      <div>
        <el-link class="iconfont icon-yinle" type="info">{{ info.name }}</el-link>
        <el-button class="el-icon-star-off" type="info" plain size="mini"
          >订阅({{ info.subCount }})</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Top',
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  flex-wrap: wrap;
  img {
    width: 180px;
    border-radius: 5px;
    margin-right: 20px;
  }
  .info {
    flex: 1;
    min-width: 300px;
    overflow: hidden;
    .radio-show {
      display: flex;
      align-items: center;
      p {
        margin: 0;
      }
      :nth-child(1) {
        box-sizing: border-box;
        border-radius: 10px;
        margin: 5px;
        background: #db1f1f;
        color: #f3f3f3;
        font-size: 14px;
        margin-right: 10px;
        padding: 5px;
      }
      :nth-child(2){
        overflow: hidden;
      text-overflow: ellipsis;
      }
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .el-link{
    margin-right: 20px;
  }
}
</style>
