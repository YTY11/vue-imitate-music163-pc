<template>
<div>
<el-aside width="200px" :class="{'modile' : !device, 'show-modile': !collapse }">
    <el-menu
    :default-active="activeMenu"
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
      <el-menu-item v-if="token" index="/video">
        <i class="iconfont icon-zhiboguanli"></i>
        <span slot="title">视频</span>
      </el-menu-item>
      <el-menu-item index="/mv">
        <i class="iconfont icon-MV"></i>
        <span slot="title">MV</span>
      </el-menu-item>
      <el-menu-item index="/radio">
        <i class="iconfont icon-diantaizhibo"></i>
        <span slot="title">电台</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
    <!-- 遮罩 -->
    <div class="modal" v-if="!device && !collapse" @click="closeModal"></div>
</div>
</template>

<script>
import { loginStatus } from '@/api/login/login'
export default {
  name: 'NavMenu',
  computed: {
    token() {
      return this.$store.state.user.token
    },
    // 判断PC 还是 移动
    device() {
      return this.$store.state.app.device === 'desktop'
    },
    // 侧边栏是否显示
    collapse() {
      return this.$store.state.app.isCollapse
    },
    // 默认选中项
    activeMenu() {
      if (!window.sessionStorage.getItem('DEFAULT_MENU')) {
        window.sessionStorage.setItem('DEFAULT_MENU', '/found')
      }
      return window.sessionStorage.getItem('DEFAULT_MENU')
    }
  },
  data() {
    return {
      path: '/found'
    }
  },
  methods: {
    // 选择菜单
    select(index, path) {
      console.log(index, path)
      window.sessionStorage.setItem('DEFAULT_MENU', index)
      this.path = index
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
  background: rgb(249, 249, 249);
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
