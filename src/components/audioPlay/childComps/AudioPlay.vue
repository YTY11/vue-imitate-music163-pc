<template>
  <div class="audio-play">
    <!-- 播放功能 -->
    <div class="play">
      <!-- 播放方式 -->
      <i class="iconfont icon-bofang-xunhuanbofang"></i>
      <!-- 上一曲 -->
      <i class="iconfont icon-bofang-xiayige-copy"></i>
      <!-- 开始暂停 -->
      <i class="iconfont icon-bofang01-xianxing"></i>
      <!-- 下一曲 -->
      <i class="iconfont icon-bofang-xiayige"></i>
      <!-- 歌词 -->
      <i class="iconfont icon-geciweidianji"></i>
    </div>
    <!-- 进度条 -->
    <div class="progress">
      <span>{{ time1 }}</span>
      <el-slider :show-tooltip="false" input-size="small" v-model="startTime"></el-slider>
      <span>{{ time2 }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AudioPlay',
  data() {
    return {
      time1: '00:00',
      time2: '00:00',
      startTime: 0,
      endTime: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.audio-play {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .play {
    width: 100%;
    max-width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 70%;
    i {
      font-size: 25px;
      &:hover{
      cursor: pointer;
    }
    }
  }
  .progress {
    height: 30%;
    width: 100%;
    display: flex;
    span {
      margin: 0 12px;
      font-size: 12px;
      line-height: 15px;
      color: darkgray;
    }
  }
}
.el-slider {
  width: 100%;
}
::v-deep .el-slider__runway {
  margin: 0;
  margin-top: 5px;
}
::v-deep .el-slider__button {
  width: 10px;
  height: 10px;
  border: 1px solid gray;
}
::v-deep .el-slider__bar {
  background: black;
}
</style>
