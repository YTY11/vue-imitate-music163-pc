import { getLoginCaptcha } from '@/api/login/login'
// 验证码获取
export default {
  data() {
    return {
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
