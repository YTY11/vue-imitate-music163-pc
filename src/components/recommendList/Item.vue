<template>
  <div class="item">
    <div>
      <span class="count"
        ><i class="iconfont icon-bofang01-xianxing"></i>{{ playCount | formatCount }}</span
      >
      <img :src="img" alt="" />
    </div>
    <p>{{ name }}</p>
  </div>
</template>

<script>
export default {
  name: 'RecommendListItme',
  props: {
    // 图片
    img: {
      type: String,
      default: ''
    },
    // 名字
    name: {
      type: String,
      default: ''
    },
    // 播放量
    playCount: {
      type: Number,
      default: 0
    }
  },
  filters: {
    // 播放量格式化
    formatCount(count) {
      return count > 10000 ? (count / 10000).toFixed(2) + '万' : count
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  &:hover{
    cursor: pointer;
  }
  position: relative;
  box-sizing: border-box;
  margin: 5px 10px;
  width: 160px;
  div{
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
     &:hover{
         transition: all .2s;
         background: white;
         opacity: .7;
      }
  }
  p {
    margin: 10px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .count {
    font-size: 12px;
    color: white;
    position: absolute;
    right: 10px;
    top: 5px;
    i{
      margin-right: 5px;
    }
  }
}
</style>
