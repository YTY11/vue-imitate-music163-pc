<template>
  <div class="audio-list" >
    <!-- 音量 -->
    <i class="iconfont"  @click="clickVoiceIcon" :class="voiceIcon"></i>
    <!-- 列表 -->
    <i class="iconfont icon-liebiao1"></i>
    <div class="progress" >
      <el-slider
        v-show="isShow"
        :vertical="true"
        :show-tooltip="false"
        input-size="small"
        v-model="value"
      ></el-slider>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AudioList',
  data() {
    return {
      // 音量
      value: 0,
      // 是否显示音量
      isShow: false
    }
  },
  computed: {
    voiceIcon() {
      if (this.value > 50) {
        return 'icon-shengyinkai'
      } else if (this.value > 0) {
        return 'icon-shengyin02-xianxing'
      } else {
        return 'icon-shengyin04-xianxing'
      }
    }
  },
  methods: {
    // 鼠标移入
    clickVoiceIcon() {
      this.isShow = !this.isShow
    }
  }
}
</script>

<style lang="scss" scoped>
.audio-list {
  position: relative;
  max-width: 100px;
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  i {
    font-size: 20px;
    &:hover {
      cursor: pointer;
    }
  }
  .progress {
    height: 50px;
    position: absolute;
    display: flex;
    top: -30px;
    left: 4px;
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
