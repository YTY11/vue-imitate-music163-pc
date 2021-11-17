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
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
// 网络数据
import {
  getDjCatelist
} from '@/api/radio/radio'
export default {
  name: 'Radio',
  data() {
    return {
      // 分类
      categories: []
    }
  },
  created() {
    this.getDjCatelist()
  },
  methods: {
    // 获取分类数据
    async getDjCatelist() {
      const { code, categories } = await getDjCatelist()
      if (code !== 200) return this.$message('error', '分类数据获取失败')
      console.log(categories)
      this.categories = this.$_.chunk(this.$_.chunk(categories, 5), 2)
    },
    // 选择分类
    selectCategory(id) {
      console.log(id)
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
}
</style>
