<template>
<div>
<el-aside width="200px" :class="{'modile' : !device, 'show-modile': !collapse }">
    <el-menu
    default-active="/found"
      class="el-menu-vertical-demo"
      background-color="#F9F9F9"
      text-color="#000"
      active-text-color="#F45252"
      @select="select"
    >
      <el-menu-item index="/found">
        <i class="iconfont icon-yinle"></i>
        <span slot="title">发现音乐</span>
      </el-menu-item>
      <el-menu-item index="/video">
        <i class="iconfont icon-shipin"></i>
        <span slot="title">视频</span>
      </el-menu-item>
      <el-menu-item index="/live">
        <i class="iconfont icon-zhiboguanli"></i>
        <span slot="title">直播</span>
      </el-menu-item>
      <el-menu-item index="/radio">
        <i class="iconfont icon-guangbo"></i>
        <span slot="title">广播</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
    <!-- 遮罩 -->
    <div class="modal" v-if="!device && !collapse" @click="closeModal"></div>
</div>
</template>

<script>
export default {
  name: 'NavMenu',
  computed: {
    // 判断PC 还是 移动
    device() {
      return this.$store.state.app.device === 'desktop'
    },
    // 侧边栏是否显示
    collapse() {
      return this.$store.state.app.isCollapse
    }
  },
  data() {
    return {
    }
  },
  methods: {
    // 选择菜单
    select(index, path) {
      console.log(index, path)
      this.$router.push(index)
      this.$store.commit('app/SET_COLLAPSE', true)
    },
    open() {
      this.isCollapse = !this.isCollapse
    },
    // 关闭遮罩层
    closeModal() {
      this.$store.commit('app/SET_COLLAPSE', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-aside{
  background: #808080;
  overflow-x: hidden;
}
.modile{
    transition: all 0.5s;
    transform: translateX(-200px);
    position: absolute;
    top: 0;
    height: 100%;
    z-index: 99999;
}
.show-modile{
  transform: translateX(0px);
}
.modal{
  z-index: 9999;
  position: absolute;
  height: 100%;
  width: 100%;
  background: black;
  opacity: .7;
  top: 0;
  right: 0;
}
.el-menu-item{
  span{
    margin-left: 5px;
  }
}
</style>
