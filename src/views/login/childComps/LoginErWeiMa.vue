<template>
   <!-- 二维码区域 -->
    <Erweima @refreshErWeiMa="refreshErWeiMa" :erWeiMaStatus="erWeiMaStatus" :imgBase64="imgBase64"/>
</template>

<script>
// 引入二维码组件
import Erweima from '@/components/login/Erweima'

// 网络数据
import { getErWeiMaKey, getErWeiMa, getErWeiMaStatus, loginStatus } from '@/api/login/login'
export default {
  name: 'LoginErWeiMa',
  components: {
    Erweima
  },
  props: {

  },
  data() {
    return {
      // 二维码base64 图片
      imgBase64: '',
      // 二维码获取时的key值
      erWeiMakey: '',
      // 二维码登录状态
      erWeiMaStatus: 0,
      // 二维码循环状态
      timer: ''
    }
  },
  mounted() {
    this.getErWeiMa()
  },
  beforeDestroy() {
    if (this.timer !== '') {
      clearInterval(this.timer)
    }
  },
  methods: {
    // 二维码获取与状态监测
    async getErWeiMa() {
      // 获取二维码key
      const { data, code } = await getErWeiMaKey()
      if (code !== 200) return this.$message('error', '二维码获取失败')
      this.erWeiMakey = data.unikey
      // 通过key 获取二维码
      const erWeiMaData = await getErWeiMa(this.erWeiMakey)
      if (erWeiMaData.code !== 200) return this.$message('error', '二维码获取失败')
      console.log(erWeiMaData.data.qrimg)
      this.imgBase64 = erWeiMaData.data.qrimg // 二维码图片 base64
      this.erWeiMaStatus = 801
      // 获取二维码登录状态
      this.timer = setInterval(async() => {
        const { code, cookie } = await getErWeiMaStatus(this.erWeiMakey)
        console.log(code)
        this.erWeiMaStatus = code
        if (this.erWeiMaStatus === 800) {
          console.log('二维码已过期,请重新获取')
          if (this.timer !== '') {
            clearInterval(this.timer)
          }
        }
        if (this.erWeiMaStatus === 803) {
          // 这一步会返回cookie
          // erWeiMaStatus.cookie
          this.$store.commit('user/SET_COOKIE', cookie)
          if (this.timer !== '') {
            clearInterval(this.timer)
          }
          const data = await loginStatus()
          console.log(data)
          this.$router.push('/found')
          console.log('授权登录成功')
        }
      }, 3000)
    },
    // 二维码刷新
    refreshErWeiMa() {
      this.getErWeiMa()
    }
  }
}
</script>
