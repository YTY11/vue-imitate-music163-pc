<template>
  <div class="netease">
    <!-- 热门推荐 -->
    <div  v-if="getDataParams.pagenum === 1">
      <h3>热门推荐</h3>
      <div class="recommend" v-for="(lists, index) in recommend" :key="index">
        <div
          @click="playMV(item.id)"
          v-for="item in lists"
          :key="item.id"
          class="recommend-item"
        >
          <div class="play-icon">
            <img v-lazy="item.picUrl + '?param=504y283'" alt="" />
          </div>
          <div class="recommend-item-info">
            <p>{{ item.name }}</p>
            <p class="recommend-name">
              <span v-for="(d, i) in item.artists" :key="d.id"
                >{{ d.name }} <span v-if="i < d.length">/</span></span
              >
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 网易出品 -->
    <h3 >网易出品</h3>
    <MVItem  @playMV="playMV" :list="exclusiveRcmd" />
    <!-- 分页 -->
    <div class="page">
      <el-button type="primary" :disabled="getDataParams.pagenum === 1" size="mini" @click="updataQueryInfo(getDataParams.pagenum--)">上一页</el-button>
     <el-button type="primary" size="mini" @click="updataQueryInfo(getDataParams.pagenum++)">下一页</el-button>
    </div>
  </div>
</template>

<script>
import MVItem from '@/components/mvItem'

// 网络数据
import { getPersonalizedMv, getExclusiveRcmd } from '@/api/mv/mv'
export default {
  name: 'Netease',
  components: {
    MVItem
  },
  data() {
    return {
      // 推荐数据
      recommend: [],
      // 网易出品数据
      exclusiveRcmd: [],
      // 网易出品数据获取参数
      getDataParams: {
        pagenum: 1, // 页码
        pagesize: 30 // 每页显示数据条数
      }
    }
  },
  created() {
    this.getPersonalizedMv()
    this.getExclusiveRcmd(this.getDataParams)
  },
  methods: {
    // 推荐MV
    async getPersonalizedMv() {
      const { code, result } = await getPersonalizedMv()
      if (code !== 200) return this.$message('error', '推荐数据获取失败')
      console.log(result)
      this.recommend = this.$_.chunk(result, 4)
    },
    // 网易出品MV
    async getExclusiveRcmd(info) {
      const { code, data } = await getExclusiveRcmd(info)
      if (code !== 200) return this.$message('error', '网易出品数据获取失败')
      this.exclusiveRcmd = data
      console.log(data)
    },
    // 播放MV
    playMV(id) {
      this.$router.push({ name: 'MvDetail', params: { id } })
    },
    // 页码改变数据更新
    updataQueryInfo() {
      this.getExclusiveRcmd(this.getDataParams)
    }
  }
}
</script>
<style lang="scss" scoped>
.netease {
  margin-top: 20px;
  .recommend {
    display: flex;
    flex-wrap: wrap;
    .recommend-item {
      margin: 0 20px 20px 0;
      width: 22%;
      min-width: 180px;
      &:hover {
        cursor: pointer;
        img {
          filter: drop-shadow(4px 8px 10px #000);
        }
        .play-icon {
          position: relative;
          &:after {
            content: '\e68f';
            width: 60px;
            height: 60px;
            display: block;
            color: #f3f3f3;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'iconfont' !important;
            font-size: 60px;
            font-style: normal;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        }
      }
      img {
        // min-width: 180px;
        width: 100%;
        border-radius: 5px;
      }
      .recommend-item-info {
        flex: 1;
        display: flex;
        justify-content: space-between;
        p {
          margin: 0;
          font-size: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          word-break: break-all;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
        .recommend-name {
          font-size: 14px;
          color: #4190ff;
        }
      }
    }
  }
   .page{
    display: flex;
    margin: 20px 0;
    justify-content: space-evenly;
  }
}
</style>
