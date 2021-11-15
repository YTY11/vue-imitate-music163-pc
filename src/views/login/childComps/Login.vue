<template>
  <div class="login-content">
    <div class="login-text">
      <h2>{{isResetPassword ? '密码重置' : '登录'}}</h2>
      <div>
        <span>没有账号？</span>
        <el-link type="primary" @click="$router.push('/signup')">点击注册</el-link>
      </div>
    </div>
    <!-- 账号登录 -->
    <LoginAccount v-if="!isCaptcha && !isErweima && !isResetPassword" @accountChange="accountChange" :typeText="type"/>
    <!-- 验证码登录 -->
    <LoginCaptcha v-else-if="isCaptcha && !isErweima && !isResetPassword" @captchaChange="captchaChange" :typeText="type"/>
    <!-- 二维码区域 -->
    <LoginErWeiMa v-if="isErweima && !isResetPassword"/>
    <!-- 密码重置 -->
    <ResetPassword v-if="isResetPassword"/>
    <el-link type="primary" @click="resetPassword">{{resetText}}</el-link>
    <br />
    <br />
    <el-link @click="loginErweimaChange" type="info" v-if="device"
      ><i class="" :class="[isErweima ? 'el-icon-user' : 'iconfont icon-erweima']"></i> {{isErweima ? '账号密码登录' : '二维码登录'}}</el-link
    >
  </div>
</template>

<script>
// 引入二维码组件
import LoginErWeiMa from './LoginErWeiMa'
// 账号登录组件
import LoginAccount from './LoginAccount'
// 验证码登录组件
import LoginCaptcha from './LoginCaptcha'
// 密码重置组件
import ResetPassword from './ResetPassword'
export default {
  name: 'Login',
  components: {
    LoginErWeiMa,
    LoginAccount,
    LoginCaptcha,
    ResetPassword
  },
  data() {
    return {
      // 登录数据
      loginData: {},
      // 登录方式
      type: '验证码登录',
      // 是否二维码登录
      isErweima: false,
      // 是否重置密码
      isResetPassword: false
    }
  },
  computed: {
    // 界面类型 PC , 移动
    device() {
      if (this.$store.state.app.device === 'mobile') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isErweima = false
      }
      return this.$store.state.app.device === 'desktop'
    },
    // 是否为验证码登录
    isCaptcha() {
      return this.type !== '验证码登录'
    },
    resetText() {
      return this.isResetPassword ? '账号登陆' : '已有账号, 忘记密码?'
    }
  },
  methods: {
    // 监听账号密码登录切换
    accountChange() {
      this.type = '账号密码登录'
    },
    // 监听验证码登录切换
    captchaChange() {
      this.type = '验证码登录'
    },
    // 二维码登录切换
    loginErweimaChange() {
      this.isErweima = !this.isErweima
    },
    // 重置密码
    resetPassword() {
      this.isResetPassword = !this.isResetPassword
      // 密码重置
      if (this.isResetPassword) {

      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-content{
    padding: 20px 40px;
    height: 100%;
    box-sizing: border-box;
    text-align: center;
    .login-text {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
