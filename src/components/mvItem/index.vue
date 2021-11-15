<template>
  <div class="mv" v-if="list">
    <div
      @click="playMV(item.id)"
      v-for="item in list"
      :key="item.id"
      class="item"
    >
      <div class="play-icon">
        <img v-lazy="item.picUrl || item.cover" alt="" />
      </div>
      <div class="item-info">
        <p>{{ item.name }}</p>
        <p class="item-name">
          <span v-for="(d, i) in item.artists" :key="d.id"
            >{{ d.name }} <span v-if="i < d.length">/</span></span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MVItem',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    // 播放MV
    playMV(id) {
      this.$emit('playMV', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.mv{
  display: flex;
  flex-wrap: wrap;
  .item{
    width: 180px;
    margin: 0 20px 20px 0;
     &:hover{
        cursor: pointer;
      img{
        filter: drop-shadow(4px 8px 10px #000);
      }
      .play-icon{
        position: relative;
        &:after{
             content:"\e68f";
             width: 60px;
             height: 60px;
             display: block;
             color: #f3f3f3;
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
    img{
      width: 100%;
      border-radius: 5px;
    }
    .item-info{
      p{
        margin: 0;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
      .item-name{
        margin-top: 10px;
        font-size: 14px;
        color: #4190FF;
      }
    }
  }
}
</style>
