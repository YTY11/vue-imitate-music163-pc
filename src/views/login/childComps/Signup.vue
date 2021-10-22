<template>
  <div class="login-content">
    <div class="login-text">
      <h2>注册</h2>
      <div>
        <span>已有账号？</span>
        <el-link type="primary" @click="$router.push('/login')">点击登录</el-link>
      </div>
    </div>
    <el-form
      :model="signupData"
      status-icon
      :rules="signupFormRules"
      ref="signupData"
    >
       <el-form-item prop="nickname">
        <el-input
          placeholder="请输入昵称"
          v-model="signupData.nickname"
        ></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input
          placeholder="请输入手机号"
          v-model="signupData.phone"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="请输入密码"
          type="password"
          show-password
          v-model="signupData.password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input
          placeholder="请输入验证码"
          v-model="signupData.captcha"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-button"
          type="danger"
          @click="submitForm('loginData')"
          >立即注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { loginDataFormRules } from '@/mixin/FormRules'
export default {
  name: 'Signup',
  mixins: [loginDataFormRules],
  data() {
    return {
      // 注册数据
      signupData: {

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
  }
</style>
