<template>
  <div class="more">
    <div class="top">
      <h3>{{ title }}</h3>
      <span class="update-time" v-if="updateTime !== 0">最近更新: {{dateFormat("YYYY-MM-DD", new Date(updateTime))}}</span>
    </div>
    <el-divider></el-divider>
    <el-table
      v-if="title === '节目排行榜'"
      :cell-class-name="tableClassName" @row-click="rowClick"
      :show-header="false"
      class="info"
      :data="list"
      stripe
      style="width: 100%"
    >
      <el-table-column width="60">
        <template slot-scope="scope">
          <div class="rank">
            <span :style="{ color: scope.row.rank <= 3 ? 'red' : 'gary' }">{{
              scope.row.rank >= 10 ? scope.row.rank : '0' + scope.row.rank
            }}</span
            ><br />
            <span
              class="rank-two"
              :class="[
                scope.row.lastRank > 0
                  ? setIcon(scope.row.rank, scope.row.lastRank)
                  : 'green'
              ]"
              v-text="rank(scope.row.rank, scope.row.lastRank)"
            ></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="60">
        <template slot-scope="scope">
          <img v-lazy="scope.row.program.coverUrl" alt="" />
        </template>
      </el-table-column>
      <el-table-column max-width="300">
        <template slot-scope="scope">
          <el-link @click.stop="goDjShowDetail(scope.row.program.id)" target="_blank">{{
           scope.row.program.name
          }}</el-link>
        </template>
      </el-table-column>
      <el-table-column max-width="300">
        <template slot-scope="scope">
          <el-link @click.stop="goDjDetail(scope.row.program.radio.id)" target="_blank">{{
           scope.row.program.radio.name
          }}</el-link>
        </template>
      </el-table-column>
      <el-table-column width="150">
        <template slot-scope="scope">
          <span class="text"
            >播放:{{ formatCount(scope.row.program.listenerCount) }}</span
          >
        </template>
      </el-table-column>
      <el-table-column width="150">
        <template slot-scope="scope">
          <span class="text"
            >赞:{{ formatCount(scope.row.program.likedCount) }}</span
          >
        </template>
      </el-table-column>
      <el-table-column width="100">
        <template slot-scope="scope">
          <span class="type" @click.stop="goRadioItem(scope.row.program.radio.categoryId)">{{ scope.row.program.radio.category }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      v-else
      :show-header="false"
      :cell-class-name="tableClassName" @row-click="rowClick"
      class="info"
      :data="list"
      stripe
      style="width: 100%"
    >
      <el-table-column width="60">
        <template slot-scope="scope">
          <img v-lazy="scope.row.coverUrl" alt="" />
        </template>
      </el-table-column>
      <el-table-column max-width="300">
        <template slot-scope="scope">
          <el-link @click.stop="goDjShowDetail(scope.row.id)" target="_blank">{{
            scope.row.name
          }}</el-link>
        </template>
      </el-table-column>
      <el-table-column max-width="300">
        <template slot-scope="scope">
          <el-link @click.stop="goDjDetail(scope.row.radio.id)" target="_blank">{{
            scope.row.radio.name
          }}</el-link>
        </template>
      </el-table-column>
      <el-table-column width="150">
        <template slot-scope="scope">
          <span class="text"
            >播放:{{ formatCount(scope.row.listenerCount) }}</span
          >
        </template>
      </el-table-column>
      <el-table-column width="150">
        <template slot-scope="scope">
          <span class="text">赞:{{ formatCount(scope.row.likedCount) }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100">
        <template slot-scope="scope">
          <span class="type" @click.stop="goRadioItem(scope.row.radio.categoryId)">{{ scope.row.radio.category }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatCount, formatSeconds, dateFormat } from '@/utility/utils'

// 网络数据
import { getSongUrl } from '@/api/found/recommend'
import { DjData } from '@/api/radio/radio'
export default {
  name: 'More',
  props: {
    title: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default() {
        return []
      }
    },
    updateTime: {
      type: Number,
      default: 0
    }
  },
  methods: {
    formatCount,
    dateFormat,
    // 选择的歌曲播放
    async rowClick(row, column, event) {
      let data = this.list[row.index]
      if (this.title === '节目排行榜') {
        data = this.list[row.index].program
      }
      // 播放地址
      const { code: status, data: Data } = await getSongUrl(data.mainTrackId)
      if (status !== 200) return this.$message('error', '播放地址获取失败')
      const djData = {}
      djData.id = data.mainTrackId // id
      djData.url = Data[0].url // id
      djData.name = data.name // 节目名
      djData.artist = data.radio.name // 电台名
      djData.type = Data[0].type // type
      djData.pic = data.coverUrl // 图片
      djData.time = formatSeconds(data.duration / 1000) // 时间
      const playData = new DjData(djData)
      this.$bus.$emit('clickPlay', { songs: [playData], index: 0 })
    },
    // 为table 行添加索引
    tableClassName({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex
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
    // 节目详情页
    goDjShowDetail(id) {
      this.$router.push({ name: 'RadioShowDetail', params: { id } })
    },
    // 电台详情页
    goDjDetail(id) {
      this.$router.push({ name: 'RadioDetail', params: { id } })
    },
    // 进入电台子页面
    goRadioItem(id) {
      this.$router.push({ name: 'RadioItem', params: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.more {
  padding: 20px;
  box-sizing: border-box;
  .top {
    display: flex;
    align-items: end;
    h3 {
      margin: 0;
    }
    .update-time{
      color: gray;
      font-size: 12px;
      margin-left: 10px;
    }
  }
  .info {
    padding: 10px;
    width: 100%;
    img {
      width: 40px;
      height: 40px;
      border-radius: 5px;
    }
    .type {
      border: 1px solid gray;
      padding: 3px;
      color: gray;
      font-size: 12px;
      border-radius: 5px;
    }
    .text {
      color: gray;
      font-size: 14px;
    }
  }
  .el-divider {
    margin: 5px 0px;
    width: 100%;
    background-color: red;
  }
  .red {
    color: red;
  }
  .green {
    color: #27d011;
  }
  .blue {
    color: #4ab8ea;
  }
  .rank {
    text-align: center;
    color: gray;
    margin-right: 10px;
    font-size: 14px;
    .rank-two {
      font-size: 12px;
    }
  }
}
.el-table {
  &:hover {
    cursor: pointer;
  }
  .el-link {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    justify-content: flex-start;
  }
}
::v-deep .cell {
  white-space: nowrap !important;
  span{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
