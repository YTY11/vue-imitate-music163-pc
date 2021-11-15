<template>
  <div class="login">
    <el-row class="place" type="flex" justify="center">
      <el-col :md="18" :lg="14" :sm="16" :xs="16" class="box-shadow">
        <el-row class="content">
          <!-- PC 端时 左侧今日头条区域 -->
          <el-col class="left" :span="12" v-if="device">
            <h3>{{ headLineTitle }}</h3>
            <p>{{ headLineContent }}</p>
          </el-col>
          <!-- 右侧登录/注册/修改密码区域 -->
          <el-col class="right" :span="device ? 12 : 24">
            <!-- logo 区域 -->
            <div
              class="icon"
              :style="{ left: !device ? '50%' : '' }"
            >
              <img src="~@/assets/img/logo.png" alt="logo" />
            </div>
            <!-- 登录 -->
            <router-view/>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import resizeHander from '@/mixin/resizeHander'
// 网络数据
import { headLineData } from '@/api/utility/utility'
export default {
  name: 'Index',
  mixins: [resizeHander],
  data() {
    return {
      // 今日头条
      headLineContent: '',
      headLineTitle: '',
      // logo 位置
      left: 'left: 50%'
    }
  },
  computed: {
    // 界面类型 PC , 移动
    device() {
      return this.$store.state.app.device === 'desktop'
    }
  },
  created() {
    // this.headLineData()
  },
  methods: {
    // 获取今日头条数据
    async headLineData() {
      const { data, status } = await headLineData()
      if (status !== 200) return this.$message('error', '今日头条数据获取失败')
      this.$message('success', '今日头条数据获取成功')
      // 使用lodash 的sample随机获取集合中的一个数据
      const headLine = JSON.parse(this.$_.sample(data.data).content)
      this.headLineContent = headLine.abstract
      this.headLineTitle = headLine.title
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url('~@/assets/img/login_bg.jpg') no-repeat;
  background-size: cover;
  background-position: center;
  overflow: auto;
  .place {
    width: 100%;
    height: 400px;
    min-height: 60%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .box-shadow {
    box-shadow: 8px 10px 8px -3px rosybrown;
    padding: 0 !important;
    .content {
      width: 100%;
      height: 100%;
      .el-col {
        height: 100%;
      }
      .left {
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        box-sizing: border-box;
        background: url('~@/assets/img/login_bg.jpg') no-repeat;
        background-size: cover;
        background-position: center;
      }
      .right {
        position: relative;
        .icon {
          img {
            width: 100%;
            height: 100%;
          }
          position: absolute;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          top: -70px;
          transform: translateX(-50%);
          border: 1px solid white;
          padding: 9px;
          box-shadow: 0 0 12px 0px black;
        }
        background: #dadde0;
      }
    }
  }
}
.el-row {
  margin: 0 !important;
}
</style>
