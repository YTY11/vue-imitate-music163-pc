<template>
  <div v-if="list" class="video">
    <div class="list" v-show="item.data.vid" @click="playVideo(item.data.vid)" v-for="item in list" :key="item.data.vid">
      <span class="iconfont icon-shipin play-count" v-if="item.data.playTime">{{
        formatCount(item.data.playTime)
      }}</span>
      <img v-if="item.data.coverUrl" v-lazy="item.data.coverUrl" alt="" />
      <p class="title" v-if="item.data.title">{{ item.data.title }}</p>
      <p class="name" v-if="item.data.creator">
        {{ item.data.creator.nickname }}
      </p>
    </div>
  </div>
</template>

<script>
import { formatCount } from '@/utility/utils'
export default {
  name: 'Video',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    // 次数格式化
    formatCount,
    // 播放
    playVideo(vid) {
      this.$emit('playVideo', vid)
    }
  }
}
</script>

<style lang="scss" scoped>
.video {
  display: flex;
  flex-wrap: wrap;
  .list {
    position: relative;
    &:hover {
      cursor: pointer;
      img{
        filter: drop-shadow(4px 8px 10px #000);
      }
       &:after{
            content:"\e68f";
            width: 60px;
            height: 60px;
            display: block;
            color: #f3f3f3;
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: "iconfont" !important;
            font-size: 60px;
            font-style: normal;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
    }
    width: 200px;
    padding: 0 15px;
    img {
      width: 200px;
      border-radius: 5px;
    }
    p {
      margin: 5px 0;
    }
    .title {
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      word-break: break-all;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    .play-count {
      position: absolute;
      font-size: 14px;
      color: #f3f3f3;
      z-index: 3;
      right: 18px;
      top: 3px;
    }
    .name {
      font-size: 14px;
      color: gray;
    }
  }
}
</style>
