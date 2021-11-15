<template>
  <div class="right">
    <!-- 其他功能区域 -->
    <div class="left" v-if="device">
    </div>
    <!-- 头像区域 -->
    <el-dropdown>
        <img v-if="isLogin" src="~@/assets/img/un_user.png" alt="" />
        <img v-else :src="profile.avatarUrl" alt="" />
        <i class="el-icon-arrow-down el-icon--right"></i>
      <el-dropdown-menu slot="dropdown" v-if="isLogin">
        <el-dropdown-item disabled>游客</el-dropdown-item>
        <el-dropdown-item @click.native="$router.push('/login')">登陆</el-dropdown-item>
      </el-dropdown-menu>
      <el-dropdown-menu slot="dropdown" v-else>
        <el-dropdown-item disabled>{{profile.nickname}}</el-dropdown-item>
        <el-dropdown-item @click.native="Gitee">Gitee地址</el-dropdown-item>
        <el-dropdown-item divided @click.native="logout">退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
// 网络数据
import { loginStatus } from '@/api/login/login'
export default {
  name: 'Right',
  data() {
    return {
      // 用户信息
      profile: {}
    }
  },
  computed: {
    // 判断PC 还是 移动
    device() {
      return this.$store.state.app.device === 'desktop'
    },
    // 判断是否登陆
    isLogin() {
      return this.$store.state.user.cookie === '' || this.$store.state.user.cookie === undefined
    }
  },
  watch: {
    // 监听是否登陆， 是就获取用户数据
    isLogin: {
      handler(newV, oldV) {
        loginStatus().then(res => {
          const { code, profile } = res.data
          if (code === 200) {
            this.profile = profile
          }
        }).catch(err => {
          console.log(err)
        })
      },
      deep: true, // 开启深度监视
      immediate: true // watch检测到值变化并且立刻使用
    }
  },
  methods: {
    // 码云地址
    Gitee() {
      window.open('https://gitee.com/yty1998/vue-imitate-music163-pc.git')
    },
    // 退出
    logout() {
      this.$store.dispatch('user/logout').then(res => {
        this.profile = null
        this.$router.go()
        this.$message('success', res)
      }).catch(err => {
        console.log(err)
        this.$message('error', '退出失败')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.right {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  .left{
    height: 100%;
    display: flex;
    align-items: center;
  }
  .el-dropdown{
    display: flex;
    align-items: center;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
</style>
