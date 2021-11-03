<template>
<el-footer>
  <aplayer
  fixed
:music="songList.length > 0 ? song : init"
:list="songList"
listFolded
/>
</el-footer>
</template>

<script>
// 自定义 音频播放器组件 样式写好了 功能待开发
// import AudioPlay from '@/components/audioPlay'

// 引入第三方音频播放器组件 vue-aplayer
import Aplayer from 'vue-aplayer'
class Audio {
  constructor(song) {
    this.title = song.name
    this.artist = song.artist
    this.url = song.url
    this.pic = song.pic
  }
}
export default {
  name: 'Footer',
  components: {
    Aplayer
  },
  data() {
    return {
      // 歌曲列表
      songList: [],
      init: {
        title: '暂无歌曲',
        artist: '暂无歌曲',
        url: '暂无歌曲',
        pic: '暂无歌曲'
      },
      song: {}
    }
  },
  mounted() {
    this.$bus.$on('clickPlay', (data) => {
      this.songList = []
      data.songs.forEach(item => {
        this.songList.push(new Audio(item))
      })
      this.song = this.songList[data.index]
    })
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.el-footer{
  height: 80px !important;
}
</style>
