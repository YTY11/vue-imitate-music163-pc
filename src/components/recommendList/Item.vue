<template>
  <div class="item">
    <div>
      <span class="count"
        ><i class="iconfont icon-bofang01-xianxing"></i>{{ playCount | formatCount }}</span
      >
      <!-- <img v-lazy="img" :key="img" alt="" /> -->
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
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      &:hover{
         transition: all .2s;
         background: white;
         opacity: .7;
         box-sizing: border-box;
         filter: drop-shadow(4px 8px 10px #000);
         &:after{
            content:"\e68f";
            // width: 60px;
            // height: 60px;
            display: block;
            color: red;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: "iconfont" !important;
            font-size: 60px;
            font-style: normal;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

      }
    }
  p {
    width: 100%;
    height: 37px;
    margin: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .count {
    z-index: 999;
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
