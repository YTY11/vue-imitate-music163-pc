<template>
  <div class="audio-list">
    <!-- 音量 -->
    <i class="iconfont" @click="clickVoiceIcon" :class="voiceIcon"></i>
    <!-- 速度可以设置倍速 -->
    <el-dropdown>
      <i class="iconfont icon-sudu speed-icon"><span ref="speed" class="speed">x1.0</span></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="setSpeed('x0.5',0.5)">0.5</el-dropdown-item>
        <el-dropdown-item @click.native="setSpeed('x1.0', 1.0)">1.0(正常)</el-dropdown-item>
        <el-dropdown-item @click.native="setSpeed('x1.25', 1.25)">1.25</el-dropdown-item>
        <el-dropdown-item @click.native="setSpeed('x1.75', 1.75)">1.75</el-dropdown-item>
        <el-dropdown-item @click.native="setSpeed('x2.0', 2.0)">2.0</el-dropdown-item>
        <el-dropdown-item @click.native="setSpeed('x3.0', 3.0)">3.0</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 列表 -->
    <i class="iconfont icon-liebiao1"></i>
    <div class="progress">
      <el-slider
        :step="step"
        :min="min"
        :max="max"
        v-show="isShow"
        :vertical="true"
        :show-tooltip="false"
        input-size="small"
        v-model="propVolume"
        @change="volumeChange"
      ></el-slider>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AudioList',
  props: {
    volume: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      // 音量
      propVolume: 0,
      // 是否显示音量
      isShow: false,
      // 最小音量
      min: 0,
      // 最大音量
      max: 1,
      // 音量调节步长
      step: 0.1
    }
  },
  watch: {
    volume: {
      handler(nD, oD) {
        this.propVolume = nD
      },
      deep: true, // 深度监视
      immediate: true // 开始就监视
    }
  },
  computed: {
    voiceIcon() {
      if (this.propVolume > 0.5) {
        return 'icon-shengyinkai'
      } else if (this.propVolume > 0) {
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
    },
    // 音量跳动时触发
    volumeChange(data) {
      this.$emit('volumeChange', data)
    },
    // 设置倍速
    setSpeed(data, speed) {
      this.$refs.speed.innerHTML = data
      this.$emit('setSpeed', speed)
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
  .speed-icon{
    position: relative;
    .speed{
      position: absolute;
      font-size: 12px;
      bottom: -13px;
      left: -6px;
      width: 30px;
      text-align: center;
    }
  }
  .progress {
    height: 50px;
    position: absolute;
    display: flex;
    top: -30px;
    left: -3px;
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
