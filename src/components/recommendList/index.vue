<template>
  <div class="recommend-list">
      <Item v-for="item in list"
      @click.native="clickPlay(item.id)"
       :key="item.id"
       :img="item.coverImgUrl || item.picUrl || item.imgurl16v9"
       :name="item.name"
       :playCount="item.playCount"/>
  </div>
</template>

<script>
import Item from './Item'
export default {
  name: 'RecommendList',
  components: {
    Item
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    // 点击播放歌单
    clickPlay(id) {
      console.log(id)
      this.$emit('clickPlay', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
