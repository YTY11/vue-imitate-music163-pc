<template>
  <div class="audio-play">
    <!-- 播放功能 -->
    <div class="play">
      <!-- 播放方式 -->
      <el-tooltip :content="content[wayIndex]" placement="top">
        <i class="iconfont" :class="wayIcon[wayIndex]" @click="setPlayWay"></i>
      </el-tooltip>
      <!-- 上一曲 -->
      <i @click="prevSong" class="iconfont icon-bofang-xiayige-copy"></i>
      <!-- 开始暂停 -->
      <i @click="play" class="iconfont" :class="[isPlay ? 'icon-bofang02-xianxing' : 'icon-bofang01-xianxing']"></i>
      <!-- 下一曲 -->
      <i @click="nextSong" class="iconfont icon-bofang-xiayige"></i>
      <!-- 歌词 -->
      <!-- <el-popover :visible-arrow="false" popper-class="lyric" placement="top" width="100%" trigger="manual" v-model="visible">
        <Scroll class="wrapper" ref="wrapper" v-if="currentLyric.lines">
            <p v-for="(line,index) in currentLyric.lines" ref="lyricLine"
              class="text" :key="index">{{line.txt}}</p>
        </Scroll> -->
         <el-tooltip class="item" effect="dark" content="功能开发中" placement="top-start">
           <!-- slot="reference" @click="getLyrics" -->
      <i  class="iconfont icon-geciweidianji"></i>
    </el-tooltip>
    <!-- </el-popover> -->
    </div>
    <!-- 进度条 -->
    <div class="progress">
      <span>{{ currentTime }}</span>
      <el-slider :disabled="max === 0" @change="sliderChange" :min="min" :max="max" :step="step" :show-tooltip="false" input-size="small" v-model="startTime"></el-slider>
      <span>{{ duration }}</span>
    </div>
  </div>
</template>

<script>
import Lyric from 'lyric-parser'
import Scroll from '@/components/scroll/Scroll'
export default {
  name: 'AudioPlay',
  components: {
    // Scroll
  },
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
    // 父组件传来的是否播放
    parentIsPlay: {
      type: Boolean,
      default: false
    },
    // 播放时常 即进度条 进度
    startPlayTime: {
      type: Number,
      default: 0
    },
    // 音频准备状态 4：可以播放
    readyState: {
      type: Number,
      default: 0
    },
    // 歌词
    lyric: {
      type: String,
      default: ''
    }
  },
  watch: {
    startPlayTime: {
      handler(nD, oD) {
        this.startTime = nD
      },
      deep: true, // 深度监视
      immediate: true // 开始就监视
    },
    parentIsPlay: {
      handler(nD, oD) {
        if (nD && this.currentLyric.length > 0 && this.visible) {
          this.currentLyric.play()
        }
        this.isPlay = nD
      },
      deep: true, // 深度监视
      immediate: true // 开始就监视
    },
    lyric: {
      handler(nD, oD) {
        if (nD !== '') {
          this.currentLyric = new Lyric(nD, this.handleLyric)
          this.currentLyric.play()
          // console.log(data)
        }
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
      wayIndex: 0,
      // 歌词是否显示
      visible: false,
      // 格式化的歌词
      currentLyric: []
    }
  },
  mounted() {
  },
  methods: {
    // 播放
    play() {
      // 音频没有加载好不能播放
      if (this.readyState !== 4) return
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
      this.$emit('setPlayWay', this.wayIndex)
    },
    // 上一曲
    prevSong() {
      this.$emit('prevSong')
    },
    // 上一曲
    nextSong() {
      this.$emit('nextSong')
    },
    // 获取歌词
    getLyrics() {
      this.visible = !this.visible
      if ((this.lyric === '' || this.lyric === undefined) && this.visible) {
        this.$emit('getLyrics')
      }
    },
    handleLyric({ lineNum, txt }) {
      // this.currentLineNum = lineNum
      console.log(lineNum, txt)
      // 若当前行大于5,开始滚动,以保歌词显示于中间位置
      if (lineNum > 0) {
        const lineEl = this.$refs.lyricLine[lineNum]
        // 结合better-scroll，滚动歌词
        this.$refs.wrapper.scrollToElement(lineEl, lineNum, 1000)
        // this.$refs.wrapper
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
.wrapper{
  height: 45px;
  overflow: hidden;
}
</style>
