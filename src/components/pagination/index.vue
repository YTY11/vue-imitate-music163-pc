<template>
  <div class="pagination">
<!-- pc端显示 -->
    <el-pagination
      v-if="device"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="pageSizes"
      :page-size="queryInfo.pagesize"
      :layout="layout ? layout : 'total, sizes, prev, pager, next, jumper'"
      :total="total"
    >
    </el-pagination>
    <!-- 移动端显示 -->
    <el-pagination
      v-else
      background
      :layout="layout ? layout : 'prev, pager, next'"
      @current-change="handleCurrentChange"
      :total="total"
      small
      :pager-count="5"
      :page-size="queryInfo.pagesize"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    device: {
      type: Boolean,
      default: true
    },
    queryInfo: {
      type: Object,
      default() {
        return {
          id: '',
          // 当前的页数
          pagenum: 1,
          // 当前每次显示多少条数据
          pagesize: 50
        }
      }
    },
    // 数据总条数
    total: {
      type: Number,
      default: 0
    },
    // 设置每页条数
    pageSizes: {
      type: Array,
      default() {
        return []
      }
    },
    layout: {
      type: String,
      defatul: undefined
    }
  },
  methods: {
    // pageSize 每页条数 改变时会触发回调
    // 重新选择 每页显示的条数
    handleSizeChange(val) {
      console.log(val)
      this.queryInfo.pagesize = val
      this.$emit('updataData', this.queryInfo)
    },
    // currentPage 当前页数改变时会触发回调
    // 跳转页面
    handleCurrentChange(val) {
      console.log(val)
      this.queryInfo.pagenum = val
      this.$emit('updataData', this.queryInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination{
  width: 100%;
  text-align: center;
}
</style>
