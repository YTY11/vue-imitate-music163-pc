<template>
  <div class="detail-header">
    <img v-lazy="playlist.coverImgUrl" alt="">
    <div class="right-msg">
       <!-- 头部 -->
      <div class="title">
        <span class="type">歌单</span>
        <p>{{playlist.name}}</p>
      </div>
      <!-- 歌单信息 -->
      <div class="song-info" v-if="dynamicData">
         <el-button @click="clickPlay" type="danger" class="el-icon-video-play" size="small">播放</el-button>
         <el-button type="info" size="small" plain class="el-icon-folder-add">收藏({{dynamicData.bookedCount | numberFormat}})</el-button>
         <el-button type="info" size="small" plain class="el-icon-position">分享({{dynamicData.shareCount | numberFormat}})</el-button>
         <el-button type="info" size="small" plain class="el-icon-download">下载</el-button>
         <el-button v-if="commitPlayList" type="info" size="small" plain class="el-icon-edit-outline">评论({{dynamicData.commentCount | numberFormat}})</el-button>
      </div>
       <!-- 创作者信息 -->
      <div class="user">
        <img v-lazy="profile.avatarUrl" alt="">
        <span v-if="profile && profile.nickname">{{profile.nickname}}</span>
        <span v-if="playlist && playlist.updateTime">创建时间:{{playlist.updateTime | dateFormat}}</span>
      </div>
      <!-- 标签 -->
      <div class="tags" v-if="playlist && playlist.tags">
        <span>标签: </span>
        <el-tag size="mini" type="info" v-for="(item, index) in playlist.tags" :key="index">{{item}}</el-tag>
      </div>
      <!-- 介绍 -->
      <div class="msg" v-if="playlist && playlist.description">
        <span>介绍: </span>
        <p>{{playlist.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
// 引入时间格式化
import { dateFormat } from '@/utility/utils'
export default {
  name: 'DetailHeader',
  props: {
    // 歌单信息
    playlist: {
      type: Object,
      default() {
        return {}
      }
    },
    // 歌单创建用户信息
    profile: {
      type: Object,
      default() {
        return {}
      }
    },
    // 评论数据
    commitPlayList: {
      type: Object,
      default() {
        return {}
      }
    },
    // 歌单详情动态
    dynamicData: {
      type: Object,
      default() {
        return {}
      }
    },
    // 歌曲详情
    songs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  filters: {
    // 时间过滤
    dateFormat(time) {
      return dateFormat('YYYY-MM-DD hh:mm:ss', new Date(time))
    },
    // 数字格式化
    numberFormat(number) {
      return number > 10000 ? (number / 10000).toFixed(2) + '万' : number
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
.detail-header{
  width: 100%;
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
  img{
    height: 160px;
    border-radius: 5px;
    margin-right: 20px;
  }
  .right-msg{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    flex-wrap: wrap;
    .title{
      display: flex;
      align-items: center;
      .type{
        text-align: center;
        width: 50px;
        padding: 5px 2px;
        border: 1px solid red;
        border-radius: 5px;
        color: red;
      }
      p{
        margin: 0;
        margin-left: 10px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
    .user{
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      img{
        width: 40px;
        height: 40px;
      }
      span{
        color: gray;
        font-size: 14px;
        margin: 0 10px;
      }
    }
    .el-tag{
      margin: 0 10px;
    }
    .msg{
      display: flex;
      flex-wrap: nowrap;
      overflow: hidden;
      span{
        white-space: nowrap;
        margin-right: 10px;
      }
      p{
        margin: 0;
        color: gray;
        font-size: 14px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
</style>
