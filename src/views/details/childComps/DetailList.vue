<template>
  <div class="detail-list">
    <!-- 标题 -->
    <div class="top">
      <h3>歌曲列表</h3>
      <span>{{}}歌曲</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailList',
  props: {
    // 歌单信息
    playlist: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-list{
  .top{
    display: flex;
    align-items: center;
  }
}
</style>
