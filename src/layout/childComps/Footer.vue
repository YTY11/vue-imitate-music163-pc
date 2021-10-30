<template>
  <!-- <aplayer float
theme='#41b883'
  :music="{}"
/> -->
<div></div>
</template>

<script>
// 自定义 音频播放器组件 样式写好了 功能待开发
// import AudioPlay from '@/components/audioPlay'

// 引入第三方音频播放器组件 vue-aplayer
import Aplayer from 'vue-aplayer'
export default {
  name: 'Footer',
  components: {
    // Aplayer
  },
  methods: {
    play(e, url) {
      this.audio = new Audio(url)
      console.dir(this.audio)
    }
  }
}
</script>
