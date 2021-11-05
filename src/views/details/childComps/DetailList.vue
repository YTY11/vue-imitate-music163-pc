<template>
  <div class="detail-list">
    <!-- 标题 -->
    <div class="top" v-if="playlist">
      <h2>歌曲列表</h2>
      <img src="" alt="">
      <span>{{ playlist.trackCount ||  playlist.size | numberFormat }} 首歌曲</span>
      <span v-if="playlist.playCount" class="right"
        >播放:
        <span class="number">{{ playlist.playCount | numberFormat }}</span>
        次</span
      >
    </div>
    <!-- 列表 -->
    <el-table
      :data="songs"
      stripe
      style="width: 100%"
      @current-change="handleCurrentChange"
    >
      <el-table-column label="#" type="index"> </el-table-column>
      <el-table-column label="操作" width="50">
        <template>
          <i class="iconfont icon-bofang01-xianxing"></i>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="歌曲标题"> </el-table-column>
      <el-table-column prop="time" label="时常"> </el-table-column>
      <el-table-column prop="artist" label="歌手"> </el-table-column>
      <el-table-column prop="album" label="专辑"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'DetailList',
  props: {
    // 歌单信息
    playlist: {
      type: Object,
      default() {
        return {}
      }
    },
    // 歌单详情动态
    dynamicData: {
      type: Object,
      default() {
        return {}
      }
    },
    // 歌曲详情
    songs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  filters: {
    // 数字格式化
    numberFormat(number) {
      return number > 10000 ? (number / 10000).toFixed(2) + '万' : number
    }
  },
  methods: {
    // 选择的歌曲
    handleCurrentChange(val) {
      const data = {}
      data.index = this.$_.findIndex(this.songs, { id: val.id })
      data.songs = this.songs
      this.$bus.$emit('clickPlay', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-list {
  .top {
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
      color: gray;
      margin-left: 20px;
    }
    .right {
      margin-left: 40px;
      font-size: 14px;
      color: gray;
      .number {
        color: red;
        margin: 0;
      }
    }
  }
  .el-table {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
