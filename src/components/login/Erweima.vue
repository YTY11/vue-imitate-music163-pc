<template>
  <div class="erweima">
    <img class="qr-guide" src="~@/assets/img/qr_guide.png" alt="">
    <div class="erweima-area">
      <el-image class="erweima-img" :src="imgBase64">
        <!-- 错误图 -->
        <img slot="error" class="error-img" src="~@/assets/img/error_img.png" alt="">
      </el-image>
      <p>使用 网易云音乐APP 扫码登录</p>
    </div>
    <div v-if="erWeiMaStatus === 800 || erWeiMaStatus === 0" class="erweima-img error">
      <el-button v-if="erWeiMaStatus === 800" @click="refreshErWeiMa" type="warning" size="mini">已过期，刷新</el-button>
      <el-button v-if="erWeiMaStatus === 0" @click="refreshErWeiMa" type="warning" size="mini">刷新</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Erweima',
  props: {
    // 二维码 base64 图
    imgBase64: {
      type: String,
      default: ''
    },
    // 二维码登录状态
    erWeiMaStatus: {
      type: Number,
      default: 0
    }
  },
  methods: {
    // 刷新二维码
    refreshErWeiMa() {
      this.$emit('refreshErWeiMa')
    }
  }
}
</script>

<style lang="scss" scoped>
  .erweima{
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    width: 100%;
    height: 190px;
    min-height: 190px;
    .qr-guide{
      width: 30%;
      height: 100%;
    }
    .erweima-area{
      display: flex;
      align-items: center;
      flex-direction: column;
      p{
        font-size: 13px;
      }
    }
    .erweima-img{
      width: 130px;
      height: 120px;
    }
    .error-img{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    .error{
      background: rgba($color: #000000, $alpha: .6);
      z-index: 10;
      position: absolute;
      right: 22px;
      top: 25px;
      line-height: 120px;
    }
    padding: 10px 0;
  }
</style>
