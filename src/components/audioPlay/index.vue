<template>
  <div class="a-player">
    <!-- 图片名字等信息 -->
    <AudioImg/>
    <!-- 播放功能 -->
    <AudioPlay @sliderChange="sliderChange" :startPlayTime="startPlayTime" :max="max" :currentTime="currentTime" :duration="duration" @isPlay="isPlay"/>
    <!-- 音量列表 -->
    <AudioList @setSpeed="setSpeed" @volumeChange="volumeChange" :volume="volume"/>
    <audio muted ref="audio" src="https://music.163.com/song/media/outer/url?id=33894312.mp3"></audio>
  </div>
</template>

<script>
// 工具类
import { formatSeconds } from '@/utility/utils'

// 音频信息组件
import AudioImg from './childComps/AudioImg'
// 播放组件
import AudioPlay from './childComps/AudioPlay'
// 音量列表组件
import AudioList from './childComps/AudioList'

export default {
  name: 'APlayer',
  components: {
    AudioImg,
    AudioPlay,
    AudioList
  },
  data() {
    return {
      // 播放位置
      currentTime: '00:00',
      // 音频总长度
      duration: '00:00',
      // 播放循环 是否清除
      currentTimeIndex: '',
      max: 0,
      // 播放时常
      startPlayTime: 0,
      // 音量 1为最大值
      volume: 1
    }
  },
  beforeDestroy() {
    this.$refs.audio.removeEventListener('canplay')
  },
  mounted() {
    // 监听音频是否已经就绪可以播放
    // 0 = HAVE_NOTHING - 没有关于音频/视频是否就绪的信息
    // 1 = HAVE_METADATA - 关于音频/视频就绪的元数据
    // 2 = HAVE_CURRENT_DATA - 关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒
    // 3 = HAVE_FUTURE_DATA - 当前及至少下一帧的数据是可用的
    // 4 = HAVE_ENOUGH_DATA - 可用数据足以开始播放
    this.$refs.audio.addEventListener('canplay', () => {
      // 返回音频当前的就绪状态
      console.log(this.$refs.audio.readyState)
      // 音频总长度
      this.max = this.$refs.audio.duration
      this.duration = formatSeconds(this.$refs.audio.duration - this.$refs.audio.currentTime)
      console.log(this.duration)
    })
  },
  methods: {
    // 判断暂停 or 播放
    isPlay(status) {
      console.log(status)
      if (status) {
        // 播放
        this.$refs.audio.play()
        console.log(this.$refs.audio.readyState)
        this.currentTime = formatSeconds(this.$refs.audio.currentTime)
        this.currentTimeIndex = setInterval(() => {
          this.currentTime = formatSeconds(this.$refs.audio.currentTime)
          this.startPlayTime = this.$refs.audio.currentTime
          this.duration = formatSeconds(this.$refs.audio.duration - this.$refs.audio.currentTime)
        }, 1000)
        console.log(this.$refs.audio.currentTime)
      } else {
        // 暂停
        this.$refs.audio.pause()
        if (this.currentTimeIndex !== '') {
          clearInterval(this.currentTimeIndex)
        }
      }
    },
    // 监听进度条拖拽
    sliderChange(data) {
      this.$refs.audio.currentTime = data
      this.currentTime = formatSeconds(this.$refs.audio.currentTime)
    },
    // 监听音量调节， 改变音量
    volumeChange(data) {
      this.volume = data
      this.$refs.audio.volume = data
    },
    // 监听倍速变化设置倍速
    setSpeed(data) {
      this.$refs.audio.playbackRate = data
    }
  }
}
</script>

<style lang="scss" scoped>
.a-player{
  display: flex;
  height: 70px;
  padding: 0 10px;
  box-shadow: 0px 0px 4px 1px gainsboro;
}
</style>
