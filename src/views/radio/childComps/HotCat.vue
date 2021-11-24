<template>
  <div class="hot-cat">
    <div class="title">
      <h3 @click="clickMore(type)">{{title}} · 电台</h3>
      <span @click="clickMore(type)">更多></span>
    </div>
    <el-divider></el-divider>
    <div class="list">
      <div @click="goDjDetail(item.id)" class="item" v-for="item in list" :key="item.id">
        <img v-lazy="item.picUrl" alt="">
        <div class="info">
          <span class="name">{{item.name}}</span>
          <span class="rcmd">{{item.rcmdtext}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotCat',
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 数据集合
    list: {
      type: Array,
      default() {
        return []
      }
    },
    // 类型
    type: {
      type: Number,
      default: 0
    }
  },
  methods: {
    clickMore(type) {
      this.$emit('clickMore', type)
    },
    goDjDetail(id) {
      this.$router.push({ name: 'RadioDetail', params: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.hot-cat{
  margin-top: 40px;
  .title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3{
      margin: 10px;
      &:hover{
        cursor: pointer;
      }
    }
    span{
      font-size: 14px;
      color: gray;
      &:hover{
        cursor: pointer;
      }
    }
  }
  .el-divider {
      margin: 5px 0px;
      width: 100%;
      background-color: red;
  }
  .list{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .item{
      &:hover{
        cursor: pointer;
      }
      width: 50%;
      display: flex;
      padding: 10px;
      box-sizing: border-box;
      img{
        width: 160px;
        border-radius: 5px;
      }
      .info{
        overflow: hidden;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .rcmd{
          color: gray;
          font-size: 14px;
        }
        span{
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
