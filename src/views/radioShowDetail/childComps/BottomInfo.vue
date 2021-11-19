<template>
  <div class="bottom-info">
    <!-- 头部信息 -->
    <p>
      <span class="category">{{ detailData.categoryName }}</span>
      <span class="name" v-if="detailData.radio"
        >{{ detailData.radio.name }}
      </span>
      <span class="serial"> 第{{ detailData.serialNum }}期 </span>
      <span class="create-time" v-if="detailData.radio"
        >{{
          dateFormat('YYYY-MM-DD', new Date(detailData.radio.createTime))
        }}
        创建</span
      >
      <span class="play-count"
        >播放: <span>{{ formatCount(detailData.listenerCount) }}</span
        >次</span
      >
    </p>
    <!-- 简介 -->
    <el-collapse>
      <el-collapse-item title="介绍: ">
        <p class="intro">{{ detailData.description }}</p>
      </el-collapse-item>
    </el-collapse>
    <!-- 歌曲列表 -->
    <el-table
      v-if="songs && songs.length > 0"
      :data="songs"
      stripe
      style="width: 100%"
      :cell-class-name="tableClassName" @row-click="rowClick"
    >
      <el-table-column :label="songsCount">
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column label="操作" width="50">
              <template>
                <i class="iconfont icon-bofang01-xianxing"></i>
              </template>
            </el-table-column>
        <el-table-column prop="name" label="歌曲名"></el-table-column>
        <el-table-column prop="artist" label="歌手"></el-table-column>
        <el-table-column prop="album" label="专辑"></el-table-column>
        <el-table-column prop="time" label="时长"></el-table-column>
      </el-table-column>
    </el-table>
    <!-- 评论区域 -->
    <Comment :commentsInfo="comments" :getCommentInfo="commentDjParams"/>
    <!-- 分页 -->
     <Pagination
    @updataData="pageChange"
      :queryInfo="commentDjParams"
      :device="device"
      :total="comments.total"
      :pageSizes="[20, 30, 50, 100]"
    />
  </div>
</template>

<script>
import { dateFormat, formatCount } from '@/utility/utils'
import Comment from '@/components/comment'
import Pagination from '@/components/pagination'
// 网络数据
import { getSongUrl } from '@/api/found/recommend'
import { DjSongData, getCommentDj } from '@/api/radio/radio'
export default {
  name: 'BottomInfo',
  components: {
    Comment,
    Pagination
  },
  props: {
    // 电台详情数据
    detailData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      // 歌曲id
      songIds: [],
      // 电台节目歌曲
      songs: [],
      // 获取评论数据参数
      commentDjParams: {
        id: '',
        pagesize: 20,
        pagenum: 1
      },
      // 评论数据
      comments: {}
    }
  },
  watch: {
    detailData: {
      handler(nD, oD) {
        this.songIds = []
        if (nD.id) {
          this.commentDjParams.id = nD.id
          this.getCommentDj(this.commentDjParams)
        }
        if (nD.songs) {
          nD.songs.forEach((item) => {
            this.songIds.push(item.id)
          })
          this.play()
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    // 节目包含歌曲数
    songsCount() {
      const length = this.detailData.songs ? this.detailData.songs.length : 0
      return '节目包含歌曲列表(' + length + '首歌)'
    },
    device() {
      return this.$store.state.app.device === 'disktop'
    }
  },
  methods: {
    dateFormat,
    formatCount,
    // 获取song Url
    async play() {
      this.songs = []
      const { code, data } = await getSongUrl(this.songIds.join(','))
      if (code !== 200) return this.$message('error', '播放地址获取失败')
      this.detailData.songs.forEach((item) => {
        const findData = this.$_.find(data, ['id', item.id])
        item.url = findData.url
        item.type = findData.type
        this.songs.push(new DjSongData(item))
      })
      console.log(data)
    },
    // 评论数据
    async getCommentDj(info) {
      const data = await getCommentDj(info)
      if (data.code !== 200) return this.$message('error', '评论数据获取失败')
      console.log(data)
      this.comments = data
    },
    // 选择的歌曲播放
    rowClick(row, column, event) {
      const data = { songs: this.songs, index: row.index }
      this.$bus.$emit('clickPlay', data)
    },
    // 为table 行添加索引
    tableClassName({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex
    },
    // 页码发生改变数据跟新
    pageChange(info) {
      this.getCommentDj(info)
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-info {
  .category {
    border: 1px solid red;
    border-radius: 5px;
    padding: 0 5px;
    font-size: 14px;
    margin-right: 10px;
    color: red;
  }
  .name,
  .serial {
    font-weight: bold;
  }
  .serial,
  .create-time {
    margin-right: 40px;
  }
  .create-time,
  .play-count {
    font-size: 14px;
    color: gray;
  }
  .play-count {
    span {
      color: red;
    }
  }
  .intro {
    color: gray;
    font-size: 14px;
    line-height: 20px;
    white-space: pre-wrap;
  }
  .el-table {
    &:hover {
      cursor: pointer;
    }
  }
}
::v-deep .cell {
  white-space: nowrap !important;
}
</style>
