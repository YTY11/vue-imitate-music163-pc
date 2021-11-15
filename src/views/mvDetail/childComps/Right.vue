<template>
  <div class="right">
    <h3>MV简介</h3>
    <el-divider></el-divider>
    <span class="msg">发布时间: {{ mvDetail.publishTime }}</span>
    <br />
    <span class="msg">播放次数: {{ formatCount(mvDetail.playCount) }}次</span>
    <p class="desc">{{ mvDetail.desc }}</p>
    <h3>相关推荐</h3>
    <el-divider></el-divider>
    <div @click="playRelatedVideo(item.id)" class="simis-mv" v-for="(item, index) in simisMvs" :key="index">
      <span class="iconfont icon-MV simis-mv-play-count">{{ formatCount(item.playCount) }}</span>
      <img v-lazy="item.cover" alt="" />
      <div class="simis-mv-info">
        <span class="one">MV</span>
        <span class="two">{{ item.name }}</span>
        <span class="three" v-for="(d, i) in item.artists" :key="d.id"
          >{{ d.name }} <span v-if="i < item.artists.length - 1">/</span></span
        >
      </div>
    </div>
  </div>
</template>

<script>
// 工具类
import { formatCount } from '@/utility/utils'
export default {
  name: 'Right',
  props: {
    // 详情
    mvDetail: {
      type: Object,
      defatul() {
        return {}
      }
    },
    // 相关推荐
    simisMvs: {
      type: Array,
      defatul() {
        return []
      }
    }
  },
  watch: {
    mvDetail: {
      handler(nD, oD) {},
      deep: true,
      immediate: true
    }
  },
  methods: {
    formatCount,
    // 播放相关视频
    playRelatedVideo(id) {
      this.$router.push({ name: 'MvDetail', params: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.right {
  box-sizing: border-box;
  padding-left: 20px;
  margin-left: 20px;
  border-left: 1px solid #dcdfe6;
  h3 {
    margin: 0;
  }
  .msg {
    font-size: 14px;
    color: gray;
    line-height: 20px;
  }
  .desc {
    font-size: 15px;
    line-height: 20px;
  }
  .el-divider {
    margin: 10px 0 20px 0;
  }
  .simis-mv {
    .simis-mv-play-count {
      font-size: 12px;
      position: absolute;
      top: 3px;
      right: calc(30% + 5px);
      color: #F3F3F3;
      z-index: 9;
    }
    &:hover {
      cursor: pointer;
    }
    position: relative;
    display: flex;
    margin-bottom: 20px;
    img {
      width: 70%;
      &:hover {
        filter: drop-shadow(4px 8px 10px #000);
      }
    }
    .simis-mv-info {
      margin-left: 10px;
      box-sizing: border-box;
      width: 30%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      span {
        // width: 100%;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .one {
        width: fit-content;
        color: red;
        border: 1px solid red;
        padding: 0 5px;
        border-radius: 5px;
      }
    }
  }
}
</style>
