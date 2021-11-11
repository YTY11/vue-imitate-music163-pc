<template>
  <div class="video">
   <video-player  class="video-player vjs-custom-skin"
                 ref="videoPlayer"
                 :options="playerOptions"
                 :playsinline="true"
                 customEventName="customstatechangedeventname"
                 >
  </video-player>
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
// 网络数据
import { getMvInfo, getMvDetail } from '@/api/found/singer'
export default {
  name: 'MvDetail',
  components: {
    videoPlayer
  },
  data() {
    return {
      playerOptions: {
        language: 'zh-CN',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: 'video/mp4',
          src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
        }],
        poster: '/static/images/author.jpg',
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      }
    }
  },
  mounted() {
    console.log('this is current player instance object', this.player)
  },
  created() {
    this.getMvInfo(this.$route.params.id)
    this.getMvDetail(this.$route.params.id)
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    // MV url
    async getMvInfo(id) {
      const { data, code } = await getMvInfo(id)
      if (code !== 200) return this.$message('error', 'MV播放资源获取失败')
      this.playerOptions.sources[0].src = data.url
      console.log(data)
    },
    // 获取对应 MV 数据 , 数据包含 mv 名字 , 歌手 , 发布时间
    async getMvDetail(id) {
      const { data, code } = await getMvDetail(id)
      if (code !== 200) return this.$message('error', 'MV 数据获取失败')
      this.playerOptions.poster = data.cover
      console.log(data)
    }

  }
}
</script>

<style lang="scss" scoped>
.video{
  width: 400px;
  height: 300px;
}
::v-deep .video-js .vjs-big-play-button{
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
