<template>
  <!-- 左侧 -->
  <div class="left">
    <!-- 头部 -->
    <p class="mv-name">
      <span class="mv-name-one">MV</span>
      <span class="mv-name-two">{{ mvDetail.name }}</span>
      <span
        class="mv-name-three"
        v-for="(item, index) in mvDetail.artists"
        :key="item.id"
        >{{ item.name
        }}<span v-if="index < mvDetail.artists.length - 1">/</span></span
      >
    </p>

    <!-- 播放区域 -->
    <video-player
      class="video-player"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      customEventName="customstatechangedeventname"
    >
    </video-player>

    <!-- 视频下方按钮 -->
    <el-button
      size="mini"
      type="danger"
      class="iconfont icon-good video-button"
      plain
      >({{ MvDetailInfo.likedCount }})</el-button
    >
    <el-button
      size="mini"
      type="danger"
      class="el-icon-folder-add video-button"
      plain
      >({{ mvDetail.subCount }})</el-button
    >
    <el-button
      size="mini"
      type="danger"
      class="el-icon-position video-button"
      plain
      >({{ MvDetailInfo.shareCount }})</el-button
    >
    <Comment :commentsInfo="commentsInfo" :getCommentInfo="getCommentInfo"/>
    <Pagination
    @updataData="pageChange"
      :queryInfo="getCommentInfo"
      :device="device"
      :total="MvDetailInfo.commentCount"
      :pageSizes="[20, 30, 50, 100]"
    />
  </div>
</template>

<script>
import Pagination from '@/components/pagination'
import Comment from '@/components/comment'
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
export default {
  name: 'Legt',
  components: {
    videoPlayer,
    Pagination,
    Comment
  },
  props: {
    // 播放数据
    playerOptions: {
      type: Object,
      defatul() {
        return {}
      }
    },
    // 详情
    mvDetail: {
      type: Object,
      defatul() {
        return {}
      }
    },
    // 播放地址
    mvInfo: {
      type: Object,
      defatul() {
        return {}
      }
    },
    // 点赞品论数等数据
    MvDetailInfo: {
      type: Object,
      defatul() {
        return {}
      }
    },
    // 获取评论的参数
    getCommentInfo: {
      type: Object,
      defatul() {
        return {}
      }
    },
    // 评论信息
    commentsInfo: {
      type: Object,
      defatul() {
        return {}
      }
    }
  },
  data() {
    return {
      // 评论的信息
      commentText: ''
    }
  },
  mounted() {
    console.log('this is current player instance object', this.player)
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    },
    device() {
      return this.$store.state.app.device === 'disktop'
    }
  },
  methods: {
    // 页码发生改变数据跟新
    pageChange(info) {
      this.$emit('pageChange', info)
    }
  }
}
</script>

<style lang="scss" scoped>
.left {
  width: 100%;
  .mv-name {
    margin: 0;
    height: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .mv-name-one {
      border: 1px solid red;
      border-radius: 5px;
      color: red;
      padding: 0 5px;
      font-size: 14px;
    }
    .mv-name-two {
      margin: 0 5px;
      font-weight: bold;
      font-size: 20px;
    }
    .mv-name-three {
      font-size: 14px;
      color: #70a5d1;
    }
  }
  .video-player {
    max-width: 100%;
    // height: 300px;
  }
  .video-button {
    margin-top: 10px;
  }
  .comment-span {
    font-size: 14px;
    color: gray;
  }
}
::v-deep .vjs-big-play-button {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
