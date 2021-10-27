<template>
  <AudioPlay/>
</template>

<script>
// 音频播放组件
import AudioPlay from '@/components/audioPlay'
export default {
  name: 'Footer',
  components: {
    AudioPlay
  },
  methods: {
    play(e, url) {
      this.audio = new Audio(url)
      console.dir(this.audio)
    }
  }
}
</script>
