<template>
  <div class="a-player">
    <!-- 图片名字等信息 -->
    <AudioImg/>
    <!-- 播放功能 -->
    <AudioPlay/>
    <!-- 音量列表 -->
    <AudioList/>
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
const audio = new Audio('http://m8.music.126.net/20211108185606/70bdff7f4f81b1f8179410c4a07585bb/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3')

audio.load()
audio.play()
audio.muted = true
setTimeout(() => {
  audio.currentTime = 0
  const timeLong = formatSeconds(audio.duration)
  console.log(timeLong)
}, 300)
// setInterval(() => {
//   const timeLong = formatSeconds(audio.duration)
//   const timeStart = formatSeconds(audio.currentTime)
//   console.log(timeStart, timeLong)
// }, 1000)
export default {
  name: 'APlayer',
  components: {
    AudioImg,
    AudioPlay,
    AudioList
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
