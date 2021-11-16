<template>
  <div class="new-mv">
    <!-- 筛选 -->
    <!-- 地区 -->
    <NavBar @active="selectArea" title="地区: " :list="area"/>

    <!-- 列表区域 -->
    <MVItem  @playMV="playMV" :list="allList" />
  </div>
</template>

<script>
import NavBar from '@/components/navbar'
import MVItem from '@/components/mvItem'

// 网络数据
import { getMVFirst } from '@/api/mv/mv'
export default {
  name: 'NewMV',
  components: {
    NavBar,
    MVItem
  },
  data() {
    return {
      // 地区
      area: ['全部', '内地', '港台', '日本', '韩国', '欧美'],
      // 获取数据参数
      mvAllParams: {
        area: '',
        pagesize: 30,
        pagenum: 1
      },
      // 所有的数据
      allList: []
    }
  },
  created() {
    this.getMVFirst(this.mvAllParams)
  },
  methods: {
    // 获取最新数据
    async getMVFirst(info) {
      const { data, code } = await getMVFirst(info)
      if (code !== 200) return this.$message('error', '最新数据获取失败')
      console.log(data)
      this.allList = data
    },
    // 选择地区
    selectArea(id) {
      if (id === 0) this.mvAllParams.area = ''
      else {
        this.mvAllParams.area = this.area[id]
      }
      this.mvAllParams.pagesize = 30
      this.mvAllParams.pagenum = 1
      this.getMVFirst(this.mvAllParams)
    },
    // 播放MV
    playMV(id) {
      this.$router.push({ name: 'MvDetail', params: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.new-mv{
  margin-top: 20px;
}
</style>
