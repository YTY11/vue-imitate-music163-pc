<template>
  <div class="singer-list" v-if="list">
    <div @click="selectSinger(item.id)" class="list" v-for="item in list" :key="item.id">
      <img v-lazy="item.picUrl" alt="" />
      <p>{{ item.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingerList',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    // 选择的歌手
    selectSinger(id) {
      this.$emit('selectSinger', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.singer-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px 0;
  .list {
    width: 160px;
    &:hover{
      cursor: pointer;
    }
    img {
      width: 160px;
      height: 160px;
      border-radius: 5px;
      &:hover{
         transition: all .2s;
        //  background: white;
         opacity: .7;
         box-sizing: border-box;
         filter: drop-shadow(4px 8px 10px #000);
      }
    }
    p {
      margin: 5px 0;
    }
  }
}
</style>
