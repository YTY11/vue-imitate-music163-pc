<template>
<el-footer>
  <!-- <aplayer
  fixed
:music="songList.length > 0 ? song : init"
:list="songList"
listFolded
/> -->
<AudioPlay @getLyrics="getLyrics" :pMusicList="songList" :pMusicIndex="songIndex"/>
</el-footer>
</template>

<script>
// 自定义 音频播放器组件 样式写好了 功能待开发
import AudioPlay from '@/components/audioPlay'
// 获取歌词
import { getLyric } from '@/api/found/singer'
// 引入第三方音频播放器组件 vue-aplayer
import Aplayer from 'vue-aplayer'

export default {
  name: 'Footer',
  components: {
    // Aplayer
    AudioPlay
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
      songIndex: 0,
      // 歌词
      lyric: ''
    }
  },
  mounted() {
    this.$bus.$on('clickPlay', (data) => {
      console.log(data)
      this.songList = data.songs
      this.songIndex = data.index
      // this.songList = []
      // data.songs.forEach(item => {
      //   // const lyric = this.getLyric(item.id)
      //   // item.lyric = lyric
      //   this.songList.push(new Audio(item))
      // })
      // this.song = this.songList[data.index]
    })
  },
  methods: {
    async getLyric(id) {
      const { lrc, code } = await getLyric(id)
      console.log(lrc)
      if (code !== 200) {
        this.$message('error', '歌词获取失败')
        this.lyric = ''
      }
      this.lyric = lrc.lyric
    },
    // 子组件获取歌词回调
    getLyrics(id) {
      this.getLyric(id)
      this.songList.forEach(item => {
        if (item.id === id) {
          console.log('@@@@@@@@@@@')
          item.lyric = this.lyric
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-footer{
  height: 80px !important;
}
</style>
