<template>
  <div class="radio-item">
    <h3 class="title">优秀新电台</h3>
    <el-divider></el-divider>
    <!-- 优秀新电台列表 -->
    <div class="good-list">
      <div class="list" @click="goDjDetail(item.id)" v-for="item in goodDjRadios" :key="item.id">
        <img v-lazy="item.picUrl" alt="">
        <div class="good-list-info">
          <p>{{item.name}}</p>
          <p>{{item.rcmdtext}}</p>
        </div>
      </div>
    </div>
    <h3 class="title">热门电台</h3>
    <el-divider></el-divider>
    <div class="hot-list">
      <div @click="goDjDetail(item.id)" class="hot" v-for="item in hotDjRadios" :key="item.id">
        <img v-lazy="item.picUrl" alt="">
        <div class="hot-info">
          <span class="hot-info-name">{{ item.name }}</span>
          <span class="hot-info-dj" v-if="item.dj">
            <img v-lazy="item.dj.avatarUrl" alt="">
            <span>{{ item.dj.nickname }}</span>
            <img v-if="item.dj.avatarDetail" v-lazy="item.dj.avatarDetail.identityIconUrl" alt="">
          </span>
          <span>共{{item.programCount}}期  订阅{{formatCount(item.subCount)}}次</span>
        </div>
      </div>
    </div>
    <!-- 分页 -->
     <Pagination
    @updataData="pageChange"
      :queryInfo="djRadioHotParams"
      :device="device"
      :total="total"
      :pageSizes="[20, 30, 40, 50]"
    />
  </div>
</template>

<script>
// 格式化
import { formatSeconds, dateFormat, formatCount } from '@/utility/utils'
import Pagination from '@/components/pagination'

// 网络数据
import {
  getRecommendType,
  getDjRadioHot
} from '@/api/radio/radio'
export default {
  name: 'RadioItem',
  components: {
    Pagination
  },
  data() {
    return {
      // 分类id
      id: '',
      // 优秀电台数据
      goodDjRadios: [],
      // 热门电台数据
      hotDjRadios: [],
      // 获取热门电台参数
      djRadioHotParams: {
        id: '',
        pagesize: 20,
        pagenum: 1
      },
      // 热门电台数据总数
      total: 0
    }
  },
  watch: {
    $route() {
      this.$router.go()
    }
  },
  computed: {
    device() {
      return this.$store.state.app.device === 'desktop'
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getRecommendType(this.id)
    this.djRadioHotParams.id = this.id
    this.getDjRadioHot(this.djRadioHotParams)
  },
  methods: {
    formatCount,
    // 获取优秀新电台
    async getRecommendType(id) {
      const { djRadios, code } = await getRecommendType(id)
      if (code !== 200) return this.$message('error', '优秀新电台获取失败')
      this.goodDjRadios = this.$_.take(djRadios, 5)
      console.log(djRadios)
    },
    // 电台热门获取
    async getDjRadioHot(info) {
      const { djRadios, code, count } = await getDjRadioHot(info)
      if (code !== 200) return this.$message('error', '电台热门获取失败')
      console.log(djRadios)
      this.hotDjRadios = djRadios
      this.total = count
    },
    // 电台详情页
    goDjDetail(id) {
      this.$router.push({ name: 'RadioDetail', params: { id } })
    },
    // 页码发生改变数据跟新
    pageChange(info) {
      this.getDjRadioHot(info)
    }
  }
}
</script>

<style lang="scss" scoped>
.radio-item{
  margin-top: 20px;
  .title{
    margin: 5px 0;
  }
  .el-divider{
    margin: 5px 0;
    background: red;
  }
  .good-list{
    display: flex;
    justify-content: space-between;
    .list{
      &:hover{
        cursor: pointer;
      }
      margin-top: 10px;
      width: 19%;
      img{
        width: 100%;
        max-width: 160px;
      }
      .good-list-info{
        p{
          font-size: 16px;
          margin: 10px 0;
        }
        :nth-child(2){
          color: gray;
          font-size: 14px;
        }
      }
    }
  }
  .hot-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .hot{
      display: flex;
      &:hover{
        cursor: pointer;
      }
      margin: 20px 0;
      box-sizing: border-box;
      width: 49%;
      img{
        width: 160px;
        margin-right: 20px;
      }
      .hot-info{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        span{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .hot-info-name{
          font-size: 16px;
          font-weight: bold;
        }
        .hot-info-dj{
          display: flex;
          align-items: center;
          font-size: 14px;
          :nth-child(1){
            width: 30px;
            height: 30px;
            border-radius: 5px;
            margin-right: 10px;
          }
          :nth-child(3){
            width: 20px;
            height: 20px;
            margin-left: 5px;
          }
        }
        :nth-child(3){
          font-size: 14px;
          color: gray;
        }
      }
    }
  }
}
</style>
