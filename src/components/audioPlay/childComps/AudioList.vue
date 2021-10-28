<template>
  <div class="audio-list">
      <!-- 音量 -->
     <i class="iconfont icon-shengyin02-xianxing"></i>
     <!-- 列表 -->
     <i class="iconfont icon-liebiao1"></i>
  </div>
</template>

<script>
export default {
  name: 'AudioList',
  data() {
    return {
      // 音量
      value: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.audio-list{
  max-width: 100px;
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  i{
    font-size: 20px;
    &:hover{
      cursor: pointer;
    }
  }
}
</style>
