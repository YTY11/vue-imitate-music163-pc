<template>
  <div class="first">
     <!-- one -->
    <div class="one">
      <!-- 推荐节目 -->
      <div class="recommend">
        <div class="top">
          <h3 @click="$router.push('/radio/recommendMore')">推荐节目</h3>
          <span @click="$router.push('/radio/recommendMore')">更多></span>
        </div>
        <el-divider></el-divider>
        <div
          class="info"
          :class="{ 'info-background': index % 2 === 0 }"
          v-for="(item, index) in recommend"
          :key="item.id"
        >
          <div @click="playDJ(item.id)" class="img">
            <img v-lazy="item.coverUrl" alt="" />
          </div>
          <div class="info-msg">
            <span @click="goRadioShowDetail(item.id)">{{ item.name }}</span>
            <span @click="goRadioDetail(item.radio.id)" class="name">{{ item.radio.name }}</span>
          </div>
          <span class="type">{{ item.radio.category }}</span>
        </div>
      </div>
      <!-- 节目排行榜 -->
      <div class="recommend">
        <div class="top">
          <h3 @click="$router.push('/radio/showOut')">节目排行榜</h3>
          <span @click="$router.push('/radio/showOut')">更多></span>
        </div>
        <el-divider></el-divider>
        <div
          class="info"
          :class="{ 'info-background': index % 2 === 0 }"
          v-for="(item, index) in toplist"
          :key="item.score"
        >
          <div class="rank">
            <span  :style="{'color':item.rank <= 3 ? 'red' : 'gary',}">{{ item.rank >= 10 ? item.rank : '0' + item.rank}}</span
            ><br />
            <span class="rank-two" :class="[item.lastRank > 0 ? setIcon(item.rank, item.lastRank) : 'green']" v-text="rank(item.rank, item.lastRank)"></span>
          </div>
          <div @click="playDJ(item.program.id)" class="img">
            <img v-lazy="item.program.coverUrl" alt="" />
          </div>
          <div class="info-msg">
            <span @click="goRadioShowDetail(item.program.id)">{{ item.program.name }}</span>
            <span @click="goRadioDetail(item.program.radio.id)" class="name">{{ item.program.radio.name }}</span>
          </div>
          <span class="type">{{ item.program.radio.category }}</span>
        </div>
      </div>
    </div>
    <!-- 音乐推荐电台 -->
    <!-- <HotCat title="音乐推荐" @clickMore="clickMore" :list="musicCateList" :type="2"/> -->
    <!-- 生活电台 -->
    <!-- <HotCat title="生活" @clickMore="clickMore" :list="lifeCateList" :type="6"/> -->
    <!-- 情感电台 -->
    <!-- <HotCat title="情感" @clickMore="clickMore" :list="emotionCateList" :type="3"/> -->
    <!-- 创作翻唱电台 -->
    <!-- <HotCat title="创作翻唱" @clickMore="clickMore" :list="creationCateList" :type="2001"/> -->
    <!-- 知识电台 -->
    <!-- <HotCat title="知识" @clickMore="clickMore" :list="knowledgeCateList" :type="11"/> -->
  </div>
</template>

<script>
import HotCat from './childComps/HotCat'

// 工具类秒数格式化
import { formatSeconds } from '@/utility/utils'

// 网络数据
import {
  getProgramRecommend,
  getProgramToplist,
  getProgramDetail,
  getRecommendType,
  DjData
} from '@/api/radio/radio'
import {
  getSongUrl
} from '@/api/found/recommend'
export default {
  name: 'First',
  components: {
    // HotCat
  },
  data() {
    return {
      // 推荐节目数据
      recommend: [],
      // 获取节目榜参数
      topListParams: {
        pagesize: 10,
        pagenum: 1
      },
      // 节目榜数据
      toplist: [],
      // 音乐推荐数据
      musicCateList: [],
      // 生活数据
      lifeCateList: [],
      // 情感数据
      emotionCateList: [],
      // 创作翻唱数据
      creationCateList: [],
      // 知识数据
      knowledgeCateList: []
    }
  },
  created() {
    this.getProgramRecommend()
    this.getProgramToplist(this.topListParams)
    this.getRecommendType()
  },
  methods: {
    // 推荐节目
    async getProgramRecommend(limit) {
      const { programs, code } = await getProgramRecommend(limit)
      if (code !== 200) return this.$message('error', '推荐节目获取失败')
      console.log(programs)
      this.recommend = programs
    },
    // 节目榜
    async getProgramToplist(info) {
      const { toplist, code } = await getProgramToplist(info)
      if (code !== 200) return this.$message('error', '节目榜获取失败')
      console.log(toplist)
      this.toplist = toplist
    },
    // 分类推荐
    async getRecommendType() {
      // 音乐推荐
      const data1 = await getRecommendType(2)
      if (data1.code !== 200) return this.$message('error', '音乐推荐获取失败')
      console.log(this.$_.take(data1.djRadios, 4))
      this.musicCateList = this.$_.take(data1.djRadios, 4)
      // 生活
      const data2 = await getRecommendType(6)
      if (data2.code !== 200) return this.$message('error', '生活推荐获取失败')
      console.log(this.$_.take(data2.djRadios, 4))
      this.lifeCateList = this.$_.take(data2.djRadios, 4)
      // 情感
      const data3 = await getRecommendType(3)
      if (data3.code !== 200) return this.$message('error', '情感推荐获取失败')
      console.log(this.$_.take(data3.djRadios, 4))
      this.emotionCateList = this.$_.take(data3.djRadios, 4)
      // 创作翻唱
      const data4 = await getRecommendType(2001)
      if (data4.code !== 200) return this.$message('error', '创作翻唱推荐获取失败')
      console.log(this.$_.take(data4.djRadios, 4))
      this.creationCateList = this.$_.take(data4.djRadios, 4)
      // 知识
      const data5 = await getRecommendType(11)
      if (data5.code !== 200) return this.$message('error', '知识推荐获取失败')
      console.log(this.$_.take(data5.djRadios, 4))
      this.knowledgeCateList = this.$_.take(data5.djRadios, 4)
    },
    // 播放
    async playDJ(id) {
      // 节目详情
      const { program, code } = await getProgramDetail(id)
      if (code !== 200) return this.$message('error', '节目详情获取失败')
      // 播放地址
      const { code: status, data } = await getSongUrl(program.mainTrackId)
      if (status !== 200) return this.$message('error', '播放地址获取失败')
      const djData = {}
      djData.id = program.mainTrackId // id
      djData.url = data[0].url // id
      djData.name = program.name // 节目名
      djData.artist = program.radio.name // 电台名
      djData.type = data[0].type // type
      djData.pic = program.coverUrl // 图片
      djData.time = formatSeconds(program.duration / 1000) // 时间
      const playData = new DjData(djData)
      this.$bus.$emit('clickPlay', { songs: [playData], index: 0 })
      console.log(playData)
      console.log(id)
    },
    // 选择分类
    selectCategory(id) {
      console.log(id)
    },
    // 设置排行图标
    setIcon(nD, oD) {
      const a = oD - nD
      if (a > 0) {
        return 'el-icon-top red'
      } else if (a < 0) {
        return 'el-icon-bottom blue'
      }
    },
    rank(nD, oD) {
      const a = oD - nD
      if (oD < 0) {
        return 'new'
      } else if (a === 0) {
        return '-' + a
      } else {
        return Math.abs(a)
      }
    },
    clickMore(type) {
      console.log(type)
    },
    // 进入电台节目详情页
    goRadioShowDetail(id) {
      this.$router.push({ name: 'RadioShowDetail', params: { id } })
    },
    // 进入电台详情页
    goRadioDetail(id) {
      console.log('********')
      this.$router.push({ name: 'RadioDetail', params: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.first{
.one {
    margin-top: 20px;
    display: flex;
    text-align: center;
    .recommend {
      padding: 0 20px;
      box-sizing: border-box;
      width: 50%;
    }
    .top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h3 {
        margin: 0;
        color: black;
        font-weight: bold;
        &:hover{
          cursor: pointer;
          border-bottom: 1px solid black;
        }
      }
      span {
        font-size: 14px;
        color: gray;
        &:hover{
          cursor: pointer;
          border-bottom: 1px solid gray;
        }
      }
    }
    .info {
      box-sizing: border-box;
      padding: 10px;
      width: 100%;
      display: flex;
      align-items: center;
      .img{
        position: relative;
        &:hover{
          cursor: pointer;
           &:after{
            content:"\e68f";
            width: 20px;
            height: 20px;
            display: block;
            color: #f3f3f3;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: "iconfont" !important;
            font-size: 20px;
            font-style: normal;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        }
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 5px;
      }
      .info-msg {
        height: 40px;
        flex: 1;
        margin-left: 10px;
        display: flex;
        overflow: hidden;
        flex-direction: column;
        justify-content: space-between;
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: left;
          &:hover {
            cursor: pointer;
            border-bottom: 1px solid;
          }
        }
        .name {
          font-size: 12px;
          color: gray;
        }
      }
      .type {
        border: 1px solid gray;
        padding: 3px;
        color: gray;
        font-size: 12px;
        border-radius: 5px;
        &:hover {
          color: black;
          border: 1px solid black;
          cursor: pointer;
        }
      }
    }
    .rank {
      color: gray;
      margin-right: 10px;
      font-size: 14px;
      .rank-two{
        font-size: 12px;
      }
    }
    .info-background {
      background-color: #f6f6f6;
    }
    .el-divider {
      margin: 5px 0px;
      width: 100%;
      background-color: red;
    }
  }
  .red {
    color: red;
  }
  .green{
    color: #27D011;
  }
  .blue{
    color: #4AB8EA;
  }
  ::v-deep .el-carousel__button {
  background-color: red !important;
  opacity: 0.28;
}
}
</style>
