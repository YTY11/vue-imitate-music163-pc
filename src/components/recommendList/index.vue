<template>
  <div class="recommend-list">
      <Item v-for="item in list"
       :key="item.id"
       :img="item.picUrl"
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
  }
}
</script>

<style lang="scss" scoped>
.recommend-list{
  display: flex;
  flex-wrap: wrap;
}
</style>
