<template>
  <div class="audio-img">
    <img v-lazy="imgInfo.pic" alt="">
    <div>
      <span>{{imgInfo.name ? imgInfo.name :  '暂无数据' }}</span>
      <span>{{imgInfo.artist ? imgInfo.artist :  '暂无数据' }}</span>
    </div>
  </div>
</template>

<script>
// demo img
import demoImg from '@/assets/img/logo.png'
export default {
  name: 'AudioImg',
  props: {
    imgInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    // 图片
    img: {
      type: String,
      default: demoImg
    },
    // 音频名字
    audioName: {
      type: String,
      default: '暂无'
    },
    // 作者名字
    authorName: {
      type: String,
      default: '暂无'
    }
  }
}
</script>

<style lang="scss" scoped>
.audio-img{
  display: flex;
  align-items: center;
  height: 100%;
  img{
    width: 60px;
    height: 60px;
    border: 1px solid gainsboro;
    border-radius: 5px;
    margin-right: 10px;
  }
  div{
    width: 100px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    span{
      overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    }
  }
}
</style>
