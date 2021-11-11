<template>
  <div class="a-player">
    <!-- 图片名字等信息 -->
    <AudioImg :imgInfo="musicList[musicIndex]"/>
    <!-- 播放功能 -->
    <AudioPlay
      :lyric="musicList[musicIndex] ? musicList[musicIndex].lyric : ''"
      :readyState="readyState"
      :parentIsPlay="parentIsPlay"
      :startPlayTime="startPlayTime"
      :max="max"
      :currentTime="currentTime"
      :duration="duration"
      @setPlayWay="setPlayWay"
      @sliderChange="sliderChange"
      @isPlay="isPlay"
      @prevSong="prevSong"
      @nextSong="nextSong"
      @getLyrics="getLyrics"
    />
    <!-- 音量列表 -->
    <AudioList
      @setSpeed="setSpeed"
      @volumeChange="volumeChange"
      @rowClick="rowClick"
      :parentIsPlay="parentIsPlay"
      :musicList="musicList"
      :musicIndex="musicIndex"
      :volume="volume"
    />
    <audio
      @pause="pause"
     @play="play"
     @error="error"
      muted
      ref="audio"
      :src="playMusic"
    ></audio>
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
  props: {
    // 父组件传来的播放列表
    pMusicList: {
      type: Array,
      default() {
        return []
      }
    },
    // 父组件传来的播放下标
    pMusicIndex: {
      type: Number,
      default: 0
    }

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
      volume: 1,
      // 播放暂停
      parentIsPlay: false,
      // 播放方式 0：循环 1：单曲循环 2：随机
      playWay: 0,
      // 音乐列表
      musicList: [
        'https://music.163.com/song/media/outer/url?id=33894312.mp3',
        'https://music.163.com/song/media/outer/url?id=822033.mp3',
        'https://music.163.com/song/media/outer/url?id=822031.mp3',
        'https://music.163.com/song/media/outer/url?id=822026.mp3'],
      // 音乐播放的下标
      musicIndex: 0,
      playMusic: '',
      // 音频准备状态
      readyState: 0,
      // 倍速
      speed: 1.0
    }
  },
  watch: {
    pMusicList: {
      handler(nD, oD) {
        this.musicList = nD
        this.playMusic = nD[this.musicIndex] ? nD[this.musicIndex].url : []
      },
      deep: true,
      immediate: true
    },
    pMusicIndex: {
      handler(nD, oD) {
        this.musicIndex = nD
      },
      deep: true,
      immediate: true
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
      this.readyState = this.$refs.audio.readyState
      // 音频总长度
      this.max = this.$refs.audio.duration
      this.duration = formatSeconds(
        this.$refs.audio.duration - this.$refs.audio.currentTime
      )
      if (this.readyState === 4) {
        this.$refs.audio.playbackRate = this.speed
        this.$refs.audio.play()
        this.parentIsPlay = !this.$refs.audio.paused
        if (this.currentTimeIndex !== '') {
          clearInterval(this.currentTimeIndex)
          this.currentTimeIndex = ''
        }
        this.isPlay(!this.$refs.audio.paused)
      } else {
        this.$refs.audio.load()
        this.$refs.audio.currentTime = this.startPlayTime
        this.parentIsPlay = !this.$refs.audio.paused
        if (this.currentTimeIndex !== '') {
          clearInterval(this.currentTimeIndex)
        }
      }
    })
  },
  methods: {
    // 判断暂停 or 播放
    isPlay(status) {
      if (this.$refs.audio.paused) {
        this.parentIsPlay = false
      } else {
        this.parentIsPlay = true
      }
      if (status) {
        // 播放
        this.$refs.audio.play()
        this.parentIsPlay = true
        this.currentTime = formatSeconds(this.$refs.audio.currentTime)
        this.currentTimeIndex = setInterval(() => {
          this.currentTime = formatSeconds(this.$refs.audio.currentTime)
          this.startPlayTime = this.$refs.audio.currentTime
          this.duration = formatSeconds(
            this.$refs.audio.duration - this.$refs.audio.currentTime
          )
          if (this.$refs.audio.ended) {
            this.parentIsPlay = false
            this.startPlayTime = 0
            switch (this.playWay) {
              case 0:
                // 循坏播放
                this.musicIndex++
                if (this.musicIndex >= this.musicList.length) { this.musicIndex = 0 }
                this.playMusic = this.musicList[this.musicIndex] ? this.musicList[this.musicIndex].url : []
                this.$refs.audio.load()
                break
              case 1:
                // 单曲循环
                // this.playMusic = this.musicList[this.musicIndex]
                this.$refs.audio.load()
                break
              case 2:
                // 随机
                // eslint-disable-next-line no-case-declarations
                const sampleData = this.$_.sample(this.musicList)
                this.musicIndex = this.$_.findIndex(this.musicList, item => {
                  return item.id === sampleData.id
                })
                this.playMusic = sampleData.url
                this.$refs.audio.load()
                break
            }
          } else {
            this.parentIsPlay = true
          }
        }, 1000)
      } else {
        // 暂停
        this.$refs.audio.pause()
        if (this.currentTimeIndex !== '') {
          clearInterval(this.currentTimeIndex)
          this.currentTimeIndex = ''
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
      this.speed = data
      this.$refs.audio.playbackRate = data
    },
    // 监听播放方式的改变 并设置
    setPlayWay(data) {
      this.playWay = data
    },
    // 音频资源加载失败
    error() {
      if (this.playMusic.length > 0) {
        this.$message('error', '音频资源加载失败')
      }
      this.currentTime = '00:00'
      this.duration = '00:00'
      this.parentIsPlay = false
      if (this.currentTimeIndex !== '') {
        clearInterval(this.currentTimeIndex)
      }
    },
    // 上一曲
    prevSong() {
      this.currentTime = '00:00'
      this.duration = '00:00'
      if (this.currentTimeIndex !== '') {
        clearInterval(this.currentTimeIndex)
      }
      const length = this.musicList.length
      if (length <= 0) {
        return this.$message('info', '暂无歌曲')
      }
      this.musicIndex--
      if (this.musicIndex < 0) {
        this.musicIndex = length - 1
      }
      this.playMusic = this.musicList[this.musicIndex] ? this.musicList[this.musicIndex].url : []
      this.$refs.audio.load()
    },
    // 下一曲
    nextSong() {
      this.currentTime = '00:00'
      this.duration = '00:00'
      if (this.currentTimeIndex !== '') {
        clearInterval(this.currentTimeIndex)
      }
      const length = this.musicList.length
      if (length <= 0) {
        return this.$message('info', '暂无歌曲')
      }
      this.musicIndex++
      if (this.musicIndex >= length) {
        this.musicIndex = 0
      }
      this.playMusic = this.musicList[this.musicIndex] ? this.musicList[this.musicIndex].url : []
      this.$refs.audio.load()
    },
    // 选择播放列表中的音乐
    rowClick(index) {
      this.musicIndex = index
      this.playMusic = this.musicList[index] ? this.musicList[index] : []
    },
    // 获取歌词
    getLyrics() {
      if (this.musicList[this.musicIndex] === undefined) return this.$message('info', '没有可以播放的音频')
      this.$emit('getLyrics', this.musicList[this.musicIndex].id)
    },
    // 监听音频播放时触发
    play() {
      this.parentIsPlay = true
    },
    // 监听音频暂停时触发
    pause() {
      this.parentIsPlay = false
    }
  }
}
</script>

<style lang="scss" scoped>
.a-player {
  display: flex;
  height: 70px;
  padding: 0 10px;
  box-shadow: 0px 0px 4px 1px gainsboro;
}
</style>
