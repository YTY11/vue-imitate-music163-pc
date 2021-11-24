<template>
  <div class="logo">
    <div class="icon" v-if="!device" @click="openMenu">
      <i class="iconfont icon-shouqianniuicon"></i>
    </div>
    <img src="~@/assets/img/logo.png" alt="">
    <h3>听音乐</h3>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  computed: {
    // 判断PC 还是 移动
    device() {
      return this.$store.state.app.device === 'desktop'
    }
  },
  methods: {
    // 控制侧边导航栏
    openMenu() {
      this.$store.commit('app/SET_COLLAPSE', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.logo{
  img{
    width: 50px;
    height: 50px;
    margin: 5px 0;
    margin-right: 10px;
  }
  height: 100%;
  display: flex;
  align-items: center;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  p{
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .icon{
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 50px;
    &:hover{
      cursor: pointer;
    }
  }
}
</style>
