<template>
  <div class="navbar">
    <span class="title">
      {{title}}
    </span>
    <div class="list">
      <span @click="active(index)" v-for="(item, index) in list" :key="index" :class="{active: index === isActive}">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    // 名字
    title: {
      type: String,
      default: ''
    },
    // 列表
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      // 是否选中
      isActive: 0
    }
  },
  methods: {
    // 选则
    active(index) {
      this.isActive = index
      this.$emit('active', index)
    }
  }
}
</script>

<style lang="scss" scoped>
  .navbar{
    margin: 10px 0;
    display: flex;
    flex-wrap: wrap;
    color: gray;
    font-size: 14px;
    .list{
      display: flex;
      flex-wrap: wrap;
      span{
        margin: 0 10px;
        &:hover{
          cursor: pointer;
        }
      }
    }
    .active{
      color: red;
    }
  }
</style>
