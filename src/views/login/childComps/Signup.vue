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
      :model="userInfo"
      status-icon
      :rules="signupFormRules"
      ref="signupData"
    >
       <el-form-item prop="nickname">
        <el-input
          placeholder="请输入昵称"
          v-model="userInfo.nickname"
        ></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input
          placeholder="请输入手机号"
          v-model="userInfo.phone"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="请输入密码"
          type="password"
          show-password
          v-model="userInfo.password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input
          placeholder="请输入验证码"
          v-model.trim="userInfo.captcha"
          @keydown.native.enter="submitForm('signupData')"
          style="width: 50%"
        ></el-input>
        <!-- 获取验证码按钮 -->
        <el-button :disabled="isCaptchaTime" @click="signupCaptcha('signupData')" style="width: 50%" type="warning" plain>{{captchaText}}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-button"
          type="danger"
          @click="submitForm('signupData')"
          >立即注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { loginDataFormRules } from '@/mixin/FormRules'

// 网络数据
import { signup } from '@/api/login/signup'
import { getLoginCaptcha, loginCaptcha, captchaVerify } from '@/api/login/login'
export default {
  name: 'Signup',
  mixins: [loginDataFormRules],
  data() {
    return {
      // 注册数据
      userInfo: {

      },
      // 验证码倒计时
      captchaTime: 0,
      // 验证码按钮文本
      captchaText: '获取验证码'
    }
  },
  computed: {
    // 获取验证码按钮文本
    isCaptchaTime() {
      if (this.captchaTime <= 0) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.captchaText = '获取验证码'
      }
      return this.captchaTime > 0
    }
  },
  methods: {
    // 注册
    submitForm(ref) {
      this.$refs[ref].validate(async valid => {
        if (!valid) return this.$message('error', '请按格式完善信息')
        // 验证码校验
        const captchaStatus = await captchaVerify(this.userInfo)
        console.log(captchaStatus)
        if (captchaStatus.code !== 200) return this.$message('error', '验证码错误')
        // 注册
        const data = await signup(this.userInfo)
        console.log(data)
        if (data === undefined || data.code !== 200) return this.$message('error', data.message)
        this.$message('success', '注册成功')
        const { profile, code, cookie, token } = await loginCaptcha(this.loginData)
        if (code !== 200) {
          this.$message('error', '自动登陆失败，请重新登陆')
          this.$router.push('/login')
          return
        }
        this.$message('success', '登录成功')
        this.$store.commit('user/SET_COOKIE', cookie)
        this.$store.commit('user/SET_TOKEN', token)
        // 跳转首页
        this.$router.push('/home')
        // 登录数据重置
        this.loginData = {}
      })
    },
    // 获取验证码
    signupCaptcha(ref) {
      this.$refs[ref].validateField('phone', async msg => {
        if (msg !== '') return this.$message('error', '请输入合法手机号')
        const { code } = await getLoginCaptcha(this.userInfo)
        if (code !== 200) return this.$message('error', '验证码获取失败')
        this.$message('success', '验证码已发送')

        // 初始化计时时间
        this.captchaTime = 60
        // 定时器
        const index = setInterval(() => {
        // 60 秒倒计时完成 关闭
          if (this.captchaTime <= 0) {
            clearInterval(index)
          }
          this.captchaText = '已发送(' + this.captchaTime + ')'
          this.captchaTime--
        }, 1000)
      })
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
