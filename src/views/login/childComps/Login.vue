<template>
  <div class="login-content">
    <div class="login-text">
      <h2>登录</h2>
      <div>
        <span>没有账号？</span>
        <el-link type="primary" @click="$router.push('/signup')">点击注册</el-link>
      </div>
    </div>
    <el-form
      :model="loginData"
      status-icon
      :rules="loginFormRules"
      ref="loginData"
    >
      <el-form-item prop="username">
        <el-input
          placeholder="手机 / 邮箱"
          v-model="loginData.username"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="请输入密码"
          type="password"
          show-password
          v-model="loginData.password"
        ></el-input>
      </el-form-item>
      <div  class="captcha-link">
        <el-link type="primary" @click="typeChange">{{typeText}}</el-link>
      </div>
      <el-form-item>
        <el-button
          class="login-button"
          type="danger"
          @click="submitForm('loginData')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
    <el-link type="primary">已有账号, 忘记密码？</el-link>
    <br />
    <br />
    <el-link type="info" v-if="device"
      ><i class="iconfont icon-erweima"></i> 扫码登录</el-link
    >
  </div>
</template>

<script>
import { loginDataFormRules } from '@/mixin/FormRules'
// 网络数据
import { loginPhone } from '@/api/login/login'
export default {
  name: 'Login',
  mixins: [loginDataFormRules],
  data() {
    return {
      // 登录数据
      loginData: {
        username: '',
        password: ''
      },
      // 登录方式
      type: '账号密码登录'
    }
  },
  computed: {
    // 界面类型 PC , 移动
    device() {
      return this.$store.state.app.device === 'desktop'
    },
    typeText() {
      return this.type === '账号密码登录' ? '验证码登录' : '账号密码登录'
    }
  },
  methods: {
    // 登录
    submitForm(ref) {
      this.$refs[ref].validate(async valid => {
        if (!valid) return this.$message('error', '请输入内容')
        // 账号密码登录
        if (this.type === '账号密码登录') {
          const data = await loginPhone(this.loginData)
          console.log(data)
          // if (code !== 200) return this.$message('error', '密码错误')
        } else { // 验证码登录

        }
      })
    },
    // 登录方式切换
    typeChange() {
      if (this.type === '账号密码登录') {
        this.type = '验证码登录'
      } else {
        this.type = '账号密码登录'
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
    .login-button{
      width: 100%;
    }
    .captcha-link{
      width: 100%;
      text-align: right;
      margin-bottom: 10px;
    }
  }
</style>
