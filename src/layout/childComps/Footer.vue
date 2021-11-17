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
    })
  },
  methods: {
    async getLyric(id) {
      const { lrc, code } = await getLyric(id)
      if (code !== 200) {
        this.$message('error', '歌词获取失败')
        this.lyric = ''
        return
      }
      this.lyric = lrc.lyric
      this.songList.forEach(item => {
        if (item.id === id) {
          item.lyric = this.lyric
          console.log(item.lyric)
        }
      })
    },
    // 子组件获取歌词回调
    getLyrics(id) {
      this.getLyric(id)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-footer{
  height: 80px !important;
}
</style>
