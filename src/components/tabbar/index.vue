<template>
  <div class="tabbar">
    <div
      v-for="(item, index) in list"
      :key="index"
      @click="activeTab(index)"
      :class="{ item: activeIndex === index }"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabbar',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      activeIndex: 0
    }
  },
  methods: {
    // 选择的选项
    activeTab(index) {
      this.activeIndex = index
      this.$emit('activeTab', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabbar {
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 16px;
  color: #000;
  div{
    margin: 0 10px;
    &:hover{
      cursor: pointer;
    }
  }
  .item {
    padding: 2px;
    font-size: 20px;
    border-bottom: 1px solid #f45252;
    color: #f45252;
  }
}
</style>
