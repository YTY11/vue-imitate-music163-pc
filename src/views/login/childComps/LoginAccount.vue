<template>
  <el-form
    :model="loginData"
    status-icon
    :rules="loginFormRules"
    ref="loginData"
  >
    <!-- 账号密码登录 -->
    <el-form-item prop="username">
      <el-input
        placeholder="手机 / 邮箱"
        v-model.trim="loginData.username"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        placeholder="请输入密码"
        type="password"
        show-password
        v-model.trim="loginData.password"
        @keydown.native.enter="submitForm('loginData')"
      ></el-input>
    </el-form-item>
    <!-- 登录方式切换 -->
    <div class="captcha-link">
      <el-link @click="visitor">游客访问</el-link>
      <el-link type="primary" @click="typeChange('loginData')">{{
        typeText
      }}</el-link>
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
</template>

<script>
import { loginDataFormRules } from '@/mixin/FormRules'

// 网络数据
import { loginPhone } from '@/api/login/login'
export default {
  name: 'LoginAccount',
  mixins: [loginDataFormRules],
  props: {
    typeText: {
      type: String,
      default: '验证码登录'
    }
  },
  data() {
    return {
      // 登录数据
      loginData: {}
    }
  },
  methods: {
    // 游客访问
    visitor() {
      window.sessionStorage.setItem('DEFAULT_MENU', '/found')
      this.$router.push('/found')
    },
    // 登录
    submitForm(ref) {
      this.$refs[ref].validate(async (valid) => {
        if (!valid) return this.$message('error', '请输入合法内容')
        // 账号密码登录
        const { profile, code, cookie, token } = await loginPhone(this.loginData)
        if (code !== 200) return this.$message('error', '密码错误')
        this.$message('success', '登录成功')
        this.$store.commit('user/SET_COOKIE', cookie)
        this.$store.commit('user/SET_TOKEN', token)
        // 跳转首页
        this.$router.push('/found')
        // 登录数据重置
        this.loginData = {}
      })
    },
    // 登录方式切换
    typeChange(ref) {
      this.$refs[ref].clearValidate()
      this.$emit('accountChange')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-button {
  width: 100%;
}
.captcha-link {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
