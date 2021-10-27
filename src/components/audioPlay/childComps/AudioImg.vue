<template>
  <div class="audio-img">
    <img :src="img" alt="">
    <div>
      <span>{{audioName}}</span>
      <span>{{authorName}}</span>
    </div>
  </div>
</template>

<script>
// demo img
import demoImg from '@/assets/img/logo.png'
export default {
  name: 'AudioImg',
  props: {
    // 图片
    img: {
      type: String,
      default: demoImg
    },
    // 音频名字
    audioName: {
      type: String,
      default: 'demo'
    },
    // 作者名字
    authorName: {
      type: String,
      default: 'demo'
    }
  }
}
</script>

<style lang="scss" scoped>
.audio-img{
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  img{
    width: 60px;
    height: 60px;
    border: 1px solid gray;
  }
  div{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
</style>
