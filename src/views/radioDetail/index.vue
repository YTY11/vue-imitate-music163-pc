<template>
  <div class="radio-detail">
    <div class="left">
      <!-- 头部区域 -->
      <Top :info="djDetail" @playDj="playDj"/>
      <!-- 列表头部 -->
      <div class="list-info">
        <span class="list-info-left"
          >节目列表 <span>共{{ total }}期</span></span
        >
        <div>
          <el-button-group>
            <el-tooltip
              :enterable="false"
              effect="dark"
              content="升序"
              placement="top-start"
            >
              <el-button
               :type="djProgramParams.asc ? 'primary' : 'info' "
                size="mini"
                class="iconfont icon-shengxu"
                @click="setAsc(true)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              :enterable="false"
              effect="dark"
              content="降序"
              placement="top-start"
            >
              <el-button
                :type="!djProgramParams.asc ? 'primary' : 'info' "
                size="mini"
                class="iconfont icon-jiangxu"
                @click="setAsc(false)"
              ></el-button>
            </el-tooltip>
          </el-button-group>
        </div>
      </div>
      <!-- table -->
      <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      :cell-class-name="tableClassName" @row-click="rowClick"
    >
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column label="操作" width="50">
              <template>
                <i class="iconfont icon-bofang01-xianxing"></i>
              </template>
            </el-table-column>
        <el-table-column prop="name" label="歌曲名">
          <template slot-scope="scope">
            <el-link @click.stop="goDjShow(scope.row.rid)" target="_blank">{{scope.row.name}}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="listenerCount" label="播放次数"></el-table-column>
        <el-table-column prop="likedCount" label="点赞数"></el-table-column>
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="time" label="时长"></el-table-column>
    </el-table>
    <!-- 分页 -->
     <Pagination
    @updataData="pageChange"
      :queryInfo="djProgramParams"
      :device="device"
      :total="total"
      :pageSizes="[30, 40, 50, 60]"
    />
    </div>
    <div class="right">
      <span>你可能喜欢</span>
      <el-divider></el-divider>
      <div @click="goNewRadio(item.id)" class="right-list" v-for="item in djRadios" :key="item.id">
        <img v-lazy="item.picUrl" alt="">
        <div class="right-list-info">
          <span class="right-title">{{item.name}}</span>
          <span class="right-name" v-if="item.dj">
            <span class="by">by</span>
            {{item.dj.nickname}}
            <img class="right-name-icon" v-if="item.dj.avatarDetail" v-lazy="item.dj.avatarDetail.identityIconUrl">
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Top from './childComps/Top'
import Pagination from '@/components/pagination'
// 格式化
import { formatSeconds, dateFormat, formatCount } from '@/utility/utils'
// 网络数据
import {
  getDjRadioHot,
  DjData,
  getDjProgram,
  getDjDetail
} from '@/api/radio/radio'
import { getSongUrl } from '@/api/found/recommend'
export default {
  name: 'RadioDetail',
  components: {
    Top,
    Pagination
  },
  data() {
    return {
      // 获取节目参数
      djProgramParams: {
        rid: '',
        pagesize: 30,
        pagenum: 1,
        asc: false // 排序 false: （降序 新 -> 旧） true: 升序 旧 -> 新）
      },
      // 获取热门电台参数
      djRadioHotParams: {
        id: '',
        pagesize: 6,
        pagenum: 1
      },
      // 节目数据
      djShow: {},
      // 电台详情
      djDetail: {},
      // 节目id
      ids: [],
      // 节目URL
      showUrls: [],
      // 格式化播放数据
      playDatas: [],
      // table 展示数据
      tableData: [],
      // 节目数
      total: 0,
      // 猜你你喜欢
      djRadios: []
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
    this.djProgramParams.rid = this.$route.params.id
    this.getDjProgram(this.djProgramParams)
    this.getDjDetail(this.$route.params.id)
  },
  methods: {
    // 节目数据
    async getDjProgram(info) {
      const { programs, code, count } = await getDjProgram(info)
      if (code !== 200) return this.$message('error', '节目获取失败')
      this.total = count
      this.djShow = programs
      this.ids = []
      programs.forEach(item => {
        this.ids.push(item.mainTrackId)
      })
      // 节目播放url
      const { data, code: status } = await getSongUrl(this.ids.join(','))
      if (status !== 200) return this.$message('error', '节目播放url获取失败')

      this.playDatas = []
      this.tableData = []
      this.djShow.forEach(item => {
        const findData = this.$_.find(data, ['id', item.mainTrackId])
        const djData = {}
        djData.id = item.mainTrackId // id
        djData.rid = item.id // id
        djData.url = findData.url // url
        djData.name = item.name // 节目名
        djData.artist = item.radio.name // 电台名
        djData.type = findData.type // type
        djData.pic = item.coverUrl // 图片
        djData.time = formatSeconds(item.duration / 1000) // 时间
        djData.date = dateFormat('YYYY-MM-DD', new Date(item.createTime)) // 日期
        djData.listenerCount = '播放' + formatCount(item.listenerCount)// 播放数
        djData.likedCount = '赞' + formatCount(item.likedCount) // 点赞数
        this.tableData.push(djData)
        this.playDatas.push(new DjData(djData))
      })
      console.log(data)
      console.log(programs)
    },
    // 电台热门
    async getDjRadioHot(info) {
      const { djRadios, code } = await getDjRadioHot(info)
      if (code !== 200) return this.$message('error', '电台热门获取失败')
      console.log(djRadios)
      this.$_.remove(djRadios, (n) => {
        return n.id + '' === this.$route.params.id
      })
      this.djRadios = djRadios
    },
    // 电台详情
    async getDjDetail(id) {
      const { data, code } = await getDjDetail(id)
      if (code !== 200) return this.$message('error', '电台详情获取失败')
      // 电台热门
      this.djRadioHotParams.id = data.categoryId
      this.getDjRadioHot(this.djRadioHotParams)
      console.log(data)
      this.djDetail = data
    },
    // 节目播放
    playDj(index) {
      const data = { songs: this.playDatas, index: 0 }
      this.$bus.$emit('clickPlay', data)
    },
    // 选择的歌曲播放
    rowClick(row, column, event) {
      const data = { songs: this.playDatas, index: row.index }
      this.$bus.$emit('clickPlay', data)
    },
    // 为table 行添加索引
    tableClassName({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex
    },
    // 进入节目详情页
    goDjShow(id) {
      this.$router.push({ name: 'RadioShowDetail', params: { id } })
    },
    // 页码发生改变数据跟新
    pageChange(info) {
      this.getDjProgram(info)
    },
    // 进入新的电台详情页
    goNewRadio(id) {
      this.$router.push({ name: 'RadioDetail', params: { id } })
    },
    // 设置节目顺序
    setAsc(data) {
      this.djProgramParams.asc = data
      this.getDjProgram(this.djProgramParams)
    }
  }
}
</script>

<style lang="scss" scoped>
.radio-detail {
  display: flex;
  .left {
    width: 70%;
    overflow: auto;
    overflow-y: hidden;
    .list-info {
      display: flex;
      justify-content: space-between;
      .list-info-left {
        font-weight: bold;
        span {
          color: gray;
          font-size: 12px;
        }
      }
    }
  }
  .right {
    border-left: 1px solid #dcdfe6;
    box-sizing: border-box;
    width: 30%;
    margin-left: 20px;
    padding-left: 20px;
    .el-divider {
      margin: 5px 0;
    }
    .right-list{
      &:hover{
        cursor: pointer;
      }
      margin: 20px 0;
      display: flex;
      img{
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      .right-list-info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        span{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .right-title{
          font-size: 16px;
        }
        .right-name{
          font-size: 14px;
          color: gray;
          .by{
            color: #C8C7C9;
          }
          .right-name-icon{
            width: 15px;
            height: 15px;
          }
        }
      }
    }
  }
   .el-table {
    &:hover {
      cursor: pointer;
    }
    margin-bottom: 20px;
    .el-link{
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
::v-deep  .cell {
  white-space: nowrap !important;
  span{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
