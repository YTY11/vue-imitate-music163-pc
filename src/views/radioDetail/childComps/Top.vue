<template>
  <div class="top">
    <img v-lazy="info.picUrl" alt="" />
    <div class="info">
      <!-- 头部信息 -->
      <div class="radio-show">
        <p>电台 ·</p>
        <p>{{ info.name }}</p>
      </div>
      <!-- 作者 -->
      <div class="author" v-if="info.dj">
        <img v-lazy="info.dj.avatarUrl" alt="">
        <span>{{info.dj.nickname}}</span>
        <img v-if="info.dj.avatarDetail" v-lazy="info.dj.avatarDetail.identityIconUrl">
      </div>
      <!-- 按钮 -->
      <div class="top-button">
        <el-button class="el-icon-star-off" size="mini" type="primary">订阅({{info.subCount}})</el-button>
        <el-button @click="playAll" size="mini" type="info" plain class="el-icon-video-play
">播放全部</el-button>
        <el-button size="mini" type="info" plain class="el-icon-position">分享({{info.shareCount}})</el-button>
      </div>
      <!-- 描述 -->
      <div class="describe">
        <span class="category">{{info.category}}</span>
        <span class="title">{{info.desc}}</span>
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
  },
  methods: {
    // 播放
    playAll() {
      this.$emit('playDj', 0)
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
    height: 180px;
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
    .author{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      :nth-child(1){
        width: 40px;
        height: 40px;
      }
      :nth-child(3){
        width: 15px;
        height: 15px;
      }
      span{
        font-size: 14px;
        color: #0C73C2;
      }
    }
    .describe{
      .category{
        font-size: 14px;
        color: red;
        border: 1px solid red;
        padding: 0 3px;
        box-sizing: border-box;
        margin-right: 10px;
      }
      .title{
        white-space: pre-wrap;
        font-size: 14px;
        color: gray;
        line-height: 25px;
      }
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
