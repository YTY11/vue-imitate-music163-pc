<template>
  <div class="classify">
    <!-- 筛选 -->
    <!-- 地区 -->
    <NavBar @active="selectArea" title="地区: " :list="area"/>
    <!-- 类型 -->
    <NavBar @active="selectType" title="类型: " :list="type"/>
    <!-- 排序 -->
    <NavBar @active="selectOrder" title="排序: " :list="order"/>
    <!-- 列表区域 -->
    <MVItem  @playMV="playMV" :list="allList" />
    <!-- 分页区域 -->
    <Pagination @updataData="queryInfoChange" :queryInfo="mvAllParams" :device="device" :total="total" :pageSizes="[30, 40, 50, 60]"/>
  </div>
</template>

<script>
import NavBar from '@/components/navbar'
import MVItem from '@/components/mvItem'
// 分页
import Pagination from '@/components/pagination'
// 网络数据
import { getMVAll } from '@/api/mv/mv'
export default {
  name: 'Classify',
  components: {
    NavBar,
    MVItem,
    Pagination
  },
  data() {
    return {
      // 地区
      area: ['全部', '内地', '港台', '日本', '韩国', '欧美'],
      // 类型
      type: ['全部', '官方版', '原生', '现场版', '网易出品'],
      // 排序
      order: ['最快', '最热', '最新'],
      // 获取数据参数
      mvAllParams: {
        area: '全部',
        type: '全部',
        order: '最快',
        pagesize: 30,
        pagenum: 1
      },
      // 所有的数据
      allList: [],
      // 总条数
      total: 0
    }
  },
  computed: {
    device() {
      return this.$store.state.app.device === 'desktop'
    }
  },
  created() {
    this.getMVAll(this.mvAllParams)
  },
  methods: {
    // 获取全部MV
    async getMVAll(info) {
      const { data, code, count } = await getMVAll(info)
      if (code !== 200) return this.$message('error', '获取全部MV失败')
      console.log(data)
      this.allList = data
      this.total = count
    },
    // 选择地区
    selectArea(id) {
      this.mvAllParams.area = this.area[id]
      this.mvAllParams.pagesize = 30
      this.mvAllParams.pagenum = 1
      this.getMVAll(this.mvAllParams)
    },
    // 选择类型
    selectType(id) {
      this.mvAllParams.type = this.type[id]
      this.mvAllParams.pagesize = 30
      this.mvAllParams.pagenum = 1
      this.getMVAll(this.mvAllParams)
    },
    // 排序
    selectOrder(id) {
      this.mvAllParams.order = this.order[id]
      this.mvAllParams.pagesize = 30
      this.mvAllParams.pagenum = 1
      this.getMVAll(this.mvAllParams)
    },
    // 播放MV
    playMV(id) {
      this.$router.push({ name: 'MvDetail', params: { id } })
    },
    // 页码改变数据更新
    queryInfoChange(info) {
      this.getMVAll(info)
    }
  }
}
</script>

<style lang="scss" scoped>
.classify {
  margin-top: 20px;
}
</style>
