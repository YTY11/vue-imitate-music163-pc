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
  }
}
</script>

<style lang="scss" scoped>
.a-player{
  overflow: hidden;
  display: flex;
  height: 70px;
  margin: 10px;
  padding: 0 10px;
  box-shadow: 0px 0px 4px 1px gainsboro;
}
</style>
