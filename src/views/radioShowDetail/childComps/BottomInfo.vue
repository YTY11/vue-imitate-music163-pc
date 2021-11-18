<template>
  <div class="bottom-info">
    <p>
      <span class="category">{{detailData.categoryName}}</span>
      <span class="name">{{detailData.radio.name}} </span>
      <span class="serial"> 第{{detailData.serialNum}}期 </span>
      <span class="create-time">{{dateFormat('YYYY-MM-DD' , new Date(detailData.radio.createTime))}} 创建</span>
      <span class="play-count">播放: <span>{{formatCount(detailData.listenerCount)}}</span>次</span>
    </p>
  </div>
</template>

<script>
import { dateFormat, formatCount } from '@/utility/utils'
export default {
  name: 'BottomInfo',
  props: {
    detailData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    dateFormat,
    formatCount
  }
}
</script>

<style lang="scss" scoped>
.bottom-info{
  .category{
    border: 1px solid red;
    border-radius: 5px;
    padding: 0 5px;
    font-size: 14px;
    margin-right: 10px;
    color: red;
  }
  .name, .serial{
    font-weight: bold;
  }
  .serial, .create-time{
    margin-right: 40px;
  }
  .create-time, .play-time{
    font-size: 14px;
    color: gray;
  }
  .play-count{
    color: red;
  }
}
</style>
