<template>
  <div class="audio-play">
    <!-- 播放功能 -->
    <div class="play">
      <!-- 播放方式 -->
      <el-tooltip :content="content[wayIndex]" placement="top">
        <i class="iconfont" :class="wayIcon[wayIndex]" @click="setPlayWay"></i>
      </el-tooltip>
      <!-- 上一曲 -->
      <i class="iconfont icon-bofang-xiayige-copy"></i>
      <!-- 开始暂停 -->
      <i @click="play" class="iconfont" :class="[isPlay ? 'icon-bofang02-xianxing' : 'icon-bofang01-xianxing']"></i>
      <!-- 下一曲 -->
      <i class="iconfont icon-bofang-xiayige"></i>
      <!-- 歌词 -->
      <i class="iconfont icon-geciweidianji"></i>
    </div>
    <!-- 进度条 -->
    <div class="progress">
      <span>{{ currentTime }}</span>
      <el-slider @change="sliderChange" :min="min" :max="max" :step="step" :show-tooltip="false" input-size="small" v-model="startTime"></el-slider>
      <span>{{ duration }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AudioPlay',
  props: {
    // 音频总长度
    duration: {
      type: String,
      default: '00:00'
    },
    // 已播放时常
    currentTime: {
      type: String,
      default: '00:00'
    },
    // 进度条最小值
    min: {
      type: Number,
      default: 0
    },
    // 进度条最大值
    max: {
      type: Number,
      default: 0
    },
    // 进度条步长
    step: {
      type: Number,
      default: 1
    },
    // 播放时常 即进度条 进度
    startPlayTime: {
      type: Number,
      default: 0
    }
  },
  watch: {
    startPlayTime: {
      handler(nD, oD) {
        this.startTime = nD
      },
      deep: true, // 深度监视
      immediate: true // 开始就监视
    }
  },
  data() {
    return {
      time1: '00:00',
      time2: '00:00',
      startTime: 0,
      isPlay: false,
      // 播放方式 icon
      wayIcon: ['icon-bofang-xunhuanbofang', 'icon-danquxunhuan', 'icon-suijibofang'],
      // 播放方式文本
      content: ['循环', '单曲循环', '随机'],
      // 播放方式 index
      wayIndex: 0
    }
  },
  methods: {
    // 播放
    play() {
      this.isPlay = !this.isPlay
      this.$emit('isPlay', this.isPlay)
    },
    // 进度条拖拽后的值
    sliderChange(data) {
      this.$emit('sliderChange', data)
    },
    // 设置播放方式
    setPlayWay() {
      this.wayIndex++
      if (this.wayIndex > 2) {
        this.wayIndex = 0
      }
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
