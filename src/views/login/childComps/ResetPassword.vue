<template>
  <el-form
      :model="resetData"
      status-icon
      :rules="loginFormRules"
      ref="resetData"
    >
    <!-- 密码重置 -->
    <!-- 新密码 -->
      <el-form-item prop="password">
        <el-input
          placeholder="请输入新密码"
          v-model.trim="resetData.password"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input
          placeholder="请输入手机号"
          v-model.trim="resetData.phone"
        ></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input
          placeholder="请输入验证码"
          v-model.trim="resetData.captcha"
          @keydown.native.enter="submitForm('resetData')"
          style="width: 50%"
        ></el-input>
        <!-- 获取验证码按钮 -->
        <el-button :disabled="isCaptchaTime" @click="getLoginCaptcha('resetData')" style="width: 50%" type="warning" plain>{{captchaText}}</el-button>
      </el-form-item>
      <!-- 登录方式切换 -->
      <!-- <div  class="captcha-link">
        <el-link @click="$router.push('/found')">游客访问</el-link>
        <el-link type="primary" @click="typeChange('loginData')">{{typeText}}</el-link>
      </div> -->
      <el-form-item>
        <el-button
          class="login-button"
          type="danger"
          @click="submitForm('resetData')"
          >密码重置</el-button
        >
      </el-form-item>
    </el-form>
</template>

<script>
import { loginDataFormRules } from '@/mixin/FormRules'

// 网络数据
import { loginCaptcha, getLoginCaptcha, captchaVerify } from '@/api/login/login'
export default {
  name: 'LoginCaptcha',
  mixins: [loginDataFormRules],
  props: {
    typeText: {
      type: String,
      default: '账号密码登录'
    }
  },
  data() {
    return {
      // 重置数据
      resetData: {},
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
    // 登录
    submitForm(ref) {
      this.$refs[ref].validate(async valid => {
        if (!valid) return this.$message('error', '请输入合法内容')
        // 验证码校验
        const data = await captchaVerify(this.resetData)
        if (data.code !== 200) return this.$message('error', '验证码错误')
        // 验证码登录
        const { profile, code, cookie, token } = await loginCaptcha(this.resetData)
        if (code !== 200) return this.$message('error', '重置失败')
        this.$message('success', '登录成功')
        this.$store.commit('user/SET_COOKIE', cookie)
        this.$store.commit('user/SET_TOKEN', token)
        // 跳转首页
        this.$router.push('/found')
        // 登录数据重置
        this.loginData = {}
      })
    },
    // 获取登录验证码验证
    getLoginCaptcha(ref) {
      this.$refs[ref].validateField('phone', async msg => {
        if (msg !== '') return this.$message('error', '请输入合法手机号')
        const { code } = await getLoginCaptcha(this.resetData)
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
    },
    // 登录方式切换
    typeChange(ref) {
      this.$refs[ref].clearValidate()
      this.$emit('captchaChange')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-button{
      width: 100%;
    }
    .captcha-link{
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
</style>
