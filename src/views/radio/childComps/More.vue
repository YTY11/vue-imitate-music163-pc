<template>
  <div class="more">
    <div class="top">
      <h3>{{ title }}</h3>
      <span></span>
    </div>
    <el-divider></el-divider>
    <el-table  v-if="title === '节目排行榜'" @row-click="rowClick" :show-header="false" class="info" :data="list" stripe style="width: 100%">
      <el-table-column width="60">
         <template slot-scope="scope">
            <div class="rank">
            <span  :style="{'color':scope.row.rank <= 3 ? 'red' : 'gary',}">{{ scope.row.rank >= 10 ? scope.row.rank : '0' + scope.row.rank}}</span
            ><br />
            <span class="rank-two" :class="[scope.row.lastRank > 0 ? setIcon(scope.row.rank, scope.row.lastRank) : 'green']" v-text="rank(scope.row.rank, scope.row.lastRank)"></span>
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
          <span>{{scope.row.program.name}}</span>
          <span class="name">{{ scope.row.program.radio.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150">
        <template slot-scope="scope">
          <span class="text">播放:{{ formatCount(scope.row.program.listenerCount)}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150">
        <template slot-scope="scope">
          <span class="text">赞:{{ formatCount(scope.row.program.likedCount)}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100">
        <template slot-scope="scope">
           <span class="type">{{scope.row.program.radio.category}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-table v-else :show-header="false" @row-click="rowClick" class="info" :data="list" stripe style="width: 100%">
      <el-table-column width="60">
         <template slot-scope="scope">
           <img v-lazy="scope.row.coverUrl" alt="" />
         </template>
      </el-table-column>
      <el-table-column max-width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.name}}</span>
          <span class="name">{{scope.row.radio.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150">
        <template slot-scope="scope">
          <span class="text">播放:{{ formatCount(scope.row.listenerCount)}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150">
        <template slot-scope="scope">
          <span class="text">赞:{{ formatCount(scope.row.likedCount)}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100">
        <template slot-scope="scope">
           <span class="type">{{scope.row.radio.category}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatCount } from '@/utility/utils'
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
    }
  },
  methods: {
    formatCount,
    // 选择电台
    rowClick(row, column, event) {
      // this.$emit('rowClick', row.index)
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
.more {
  padding: 20px;
  box-sizing: border-box;
  .top {
    display: flex;
    h3 {
      margin: 0;
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
    .text{
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
  .green{
    color: #27D011;
  }
  .blue{
    color: #4AB8EA;
  }
  .rank {
    text-align: center;
      color: gray;
      margin-right: 10px;
      font-size: 14px;
      .rank-two{
        font-size: 12px;
      }
    }
}
::v-deep .cell {
  white-space: nowrap !important;
}
</style>
