<template>
  <div class="detail-header" v-if="playlist">
    <img v-lazy="playlist.picUrl" alt="" />
    <div class="right-msg">
      <!-- 头部 -->
      <div class="title">
        <span class="type">专辑</span>
        <p>{{ playlist.name }}</p>
      </div>
      <!-- 创作者信息 -->
      <div class="user" v-if="playlist.artist">
        <img v-lazy="playlist.artist.img1v1Url" alt="" />
        <span>歌手: {{ playlist.artist.name }}</span>
        <span>发行时间: {{ playlist.publishTime | dateFormat }}</span>
      </div>
      <p class="company">发行公司: {{ playlist.company }}</p>
      <!-- 歌单信息 -->
      <div class="song-info" v-if="dynamicData">
        <el-button
          @click="clickPlay"
          type="danger"
          class="el-icon-video-play"
          size="small"
          >播放</el-button
        >
        <el-button type="info" size="small" plain class="el-icon-folder-add"
          >收藏</el-button
        >
        <el-button type="info" size="small" plain class="el-icon-position"
          >分享({{ dynamicData.shareCount }})</el-button
        >
        <el-button type="info" size="small" plain class="el-icon-download"
          >下载</el-button
        >
        <el-button type="info" size="small" plain class="el-icon-edit-outline"
          >评论({{ dynamicData.commentCount }})</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
// 引入时间格式化
import { dateFormat } from '@/utility/utils'
export default {
  name: 'AlbumHeader',
  props: {
    // 专辑信息
    playlist: {
      type: Object,
      default() {
        return {}
      }
    },
    // 专辑动态
    dynamicData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    // 时间过滤
    dateFormat(time) {
      return dateFormat('YYYY-MM-DD', new Date(time))
    }
  },
  methods: {
    // 播放
    clickPlay() {
      const data = {}
      data.index = 0
      data.songs = this.songs
      this.$bus.$emit('clickPlay', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-header {
  width: 100%;
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
  img {
    height: 180px;
    border-radius: 5px;
    margin-right: 20px;
  }
  .right-msg {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    flex-wrap: wrap;
    min-width: 310px;
    .title {
      display: flex;
      align-items: center;
      .type {
        text-align: center;
        width: 50px;
        padding: 5px 2px;
        border: 1px solid red;
        border-radius: 5px;
        color: red;
      }
      p {
        margin: 0;
        margin-left: 10px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
    .user {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      img {
        width: 40px;
        height: 40px;
        margin: 0;
      }
      span {
        color: gray;
        font-size: 14px;
        margin: 0 10px;
      }
    }
    .company {
      margin: 0;
      color: gray;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
}
</style>
