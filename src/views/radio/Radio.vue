<template>
  <div class="radio">
    <!-- 分类区域 -->
    <el-carousel :autoplay="false" trigger="click" height="170px">
      <el-carousel-item v-for="(list, index) in categories" :key="index">
        <div class="category">
          <div
            @click="selectCategory(item.id)"
            class="category-item"
            v-for="item in list[0]"
            :key="item.id"
          >
            <img v-lazy="item.pic96x96Url" alt="" />
            <p>{{ item.name }}</p>
          </div>
        </div>
        <div class="category">
          <div
            @click="selectCategory(item.id)"
            class="category-item"
            v-for="item in list[1]"
            :key="item.id"
          >
          <!-- pic84x84IdUrl -->
            <img v-lazy="item.pic96x96Url" alt="" />
            <p>{{ item.name }}</p>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
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
          @click="playDJ(item.mainTrackId)"
          class="info"
          :class="{ 'info-background': index % 2 === 0 }"
          v-for="(item, index) in recommend"
          :key="item.id"
        >
          <img v-lazy="item.coverUrl" alt="" />
          <div class="info-msg">
            <span>{{ item.name }}</span>
            <span class="name">{{ item.radio.name }}</span>
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
          <img v-lazy="item.program.coverUrl" alt="" />
          <div class="info-msg">
            <span>{{ item.program.name }}</span>
            <span class="name">{{ item.program.radio.name }}</span>
          </div>
          <span class="type">{{ item.program.radio.category }}</span>
        </div>
      </div>
    </div>

    <!-- 音乐推荐电台 -->
    <div class="music-recommend">
      <div></div>
    </div>
  </div>
</template>

<script>
// 网络数据
import {
  getDjCatelist,
  getProgramRecommend,
  getProgramToplist,
  getProgramDetail,
  getRecommendType
} from '@/api/radio/radio'
export default {
  name: 'Radio',
  data() {
    return {
      // 分类
      categories: [],
      // 推荐节目数据
      recommend: [],
      // 获取节目榜参数
      topListParams: {
        pagesize: 10,
        pagenum: 1
      },
      // 节目榜数据
      toplist: []
    }
  },
  created() {
    this.getDjCatelist()
    this.getProgramRecommend()
    this.getProgramToplist(this.topListParams)
  },
  methods: {
    // 获取分类数据
    async getDjCatelist() {
      const { code, categories } = await getDjCatelist()
      if (code !== 200) return this.$message('error', '分类数据获取失败')
      console.log(categories)
      this.categories = this.$_.chunk(this.$_.chunk(categories, 5), 2)
    },
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
      if (code !== 200) return this.$message('error', '推荐节目获取失败')
      console.log(toplist)
      this.toplist = toplist
    },
    // 节目详情
    async getProgramDetail(id) {
      const { program, code } = await getProgramDetail(id)
      if (code !== 200) return this.$message('error', '推荐节目获取失败')
      console.log(program)
    },
    // 分类推荐
    async getRecommendType(type) {
      const { code, djRadios } = await getRecommendType(type)
      if (code !== 200) return this.$message('error', '分类推荐获取失败')
      console.log(djRadios)
    },
    // 播放
    playDJ(id) {
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
    }
  }
}
</script>
<style lang="scss" scoped>
.radio {
  .category {
    display: flex;
    img {
      width: 50px;
      height: 50px;
      background: darkgray;
      border-radius: 50%;
    }
    p {
      font-size: 14px;
      color: gray;
      text-align: center;
      margin: 0;
      margin-bottom: 10px;
    }
    .category-item {
      width: 20%;
      text-align: center;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .category-left {
    justify-content: start;
  }
  .el-carousel__item.is-animating {
    padding: 0 40px;
    box-sizing: border-box;
  }
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
        &:hover {
          cursor: pointer;
        }
      }
      span {
        font-size: 14px;
        color: gray;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .info {
      &:hover {
        cursor: pointer;
      }
      box-sizing: border-box;
      padding: 10px;
      width: 100%;
      display: flex;
      align-items: center;
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
}
::v-deep .el-carousel__button {
  background-color: red !important;
  opacity: 0.28;
}
</style>
