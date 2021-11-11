<template>
  <div class="singer-header" v-if="artist">
    <div class="left">
      <img v-lazy="artist.picUrl" alt="">
    </div>
    <div class="right">
      <!-- 头部 -->
      <div class="title">
        <span class="type">歌手</span>
        <p>{{artist.name}} <span class="alias-name" v-for="(item, index) in artist.alias" :key="index"> {{item}} |</span></p>
      </div>
      <!-- 功能 -->
      <div>
       <el-button @click="goProfile(artist.id)" type="danger" size="mini" plain class="el-icon-user">个人主页</el-button>
       <el-button type="danger" size="mini" plain class="el-icon-folder-add">收藏</el-button>
      </div>
      <!-- 作品信息 -->
      <div class="info">
        <el-tag size="mini" type="danger">单曲数: {{artist.musicSize}}</el-tag>
        <el-tag size="mini" type="danger">专辑数: {{artist.albumSize}}</el-tag>
        <el-tag size="mini" type="danger">MV数: {{artist.mvSize}}</el-tag>
      </div>
      <!-- 简介 -->
      <p class="introduce">简介: <span>{{artist.briefDesc}}</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingerHeader',
  props: {
    artist: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    // 进入歌手主页
    goProfile(id) {
      console.log('@@@', id)
      this.$router.push({ name: 'SingerProfile', params: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.singer-header{
  display: flex;
  flex-wrap: wrap;
  .left{
    margin-right: 20px;
    img{
      width: 180px;
      height: 160px;
      border-radius: 5px;
    }
  }
  .right{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-around;
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
        margin: 0 10px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        .alias-name{
          color: gray;
          font-size: 12px;
        }
      }
    }
    .el-tag{
      margin-right: 10px;
    }
    .introduce{
      margin: 0;
      span{
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
}
</style>
