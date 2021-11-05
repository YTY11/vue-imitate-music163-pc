<template>
  <div class="singer">
    <!-- 语种 -->
    <NavBar @active="selectLanguage" title="语种: " :list="['全部', '华语', '欧美', '日本', '韩国', '其他']"/>
    <!-- 分类 -->
    <NavBar @active="selectClassify" title="分类: " :list="['全部', '男歌手', '女歌手', '乐队']"/>
    <!-- 筛选 -->
    <NavBar @active="selectScreen" title="筛选: " :list="screen"/>

    <!-- 列表 -->
    <SingerList @selectSinger="selectSinger" :list="artists"/>
    <!-- pc端显示 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="info.offset"
      :page-sizes="[30, 40, 50, 60]"
      :page-size="info.limit"
      background
      layout="sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>

<script>
import NavBar from '@/components/navbar'
import SingerList from '@/components/singerList'
// 网络数据
import { getSingerList } from '@/api/found/singer'
export default {
  name: 'Singer',
  components: {
    NavBar,
    SingerList
  },
  data() {
    return {
      // 语种index
      language: [-1, 7, 96, 8, 16, 0],
      // 分类
      classify: [-1, 1, 2, 3],
      // 筛选
      screen: ['热门', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'],
      // 选择的数据
      info: {
        type: -1, // 分类
        area: -1, // 语种
        initial: -1, // 筛选
        limit: 30, // 每页数据条数
        offset: 0 // 页码
      },
      // 数据
      artists: []
    }
  },
  created() {
    this.getSingerList(this.info)
  },
  methods: {
    // 获取歌手分类列表
    async getSingerList(info) {
      const data = await getSingerList(info)
      if (data.code !== 200) return this.$message('error', '获取歌手分类列表失败')
      console.log(data)
      this.artists = data.artists
    },
    // 选择语种
    selectLanguage(index) {
      console.log(this.language[index])
      this.info.area = this.language[index]
      this.getSingerList(this.info)
    },
    // 选择分类
    selectClassify(index) {
      console.log(this.classify[index])
      this.info.type = this.classify[index]
      this.getSingerList(this.info)
    },
    // 选择筛选
    selectScreen(index) {
      let data = this.screen[index]
      if (data === '热门') {
        data = -1
      } else if (data === '#') {
        data = 0
      } else {
        data = data.toLowerCase()
      }
      this.info.initial = data
      this.getSingerList(this.info)
      console.log(data)
    },
    // pageSize 每页条数 改变时会触发回调
    // 重新选择 每页显示的条数
    handleSizeChange(val) {
      console.log(val)
      this.info.limit = val
      this.getSingerList(this.info)
    },
    // currentPage 当前页数改变时会触发回调
    // 跳转页面
    handleCurrentChange(val) {
      console.log(val)
      this.info.offset = val
      this.getSingerList(this.info)
    },
    // 选择的歌手
    async selectSinger(id) {
      this.$router.push({ name: 'SingerDetail', params: { id } })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-pagination{
  text-align: center;
}
</style>
