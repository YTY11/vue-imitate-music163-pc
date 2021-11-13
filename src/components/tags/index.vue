<template>
  <div class="tags">
    <!-- 选择展示区域 -->
    <div class="left">
      <el-button @click="clickbutton" size="mini" type="info"
        >{{ selectData }}<i class="el-icon-arrow-down el-icon--right"></i
      ></el-button>
      <!-- 全部分类 -->
      <i
        v-if="isShow"
        class="
          iconfont
          icon-shangjiantou icon
          animate__animated animate__bounceInLeft
        "
      ></i>
      <div
        v-if="isShow"
        class="
          all-tag
          animate__animated animate__bounceInLeft animate__bounceInLeft
        "
      >
        <el-button plain size="mini" type="info" @click="setTagName('全部歌单')"
          >全部歌单</el-button
        >
        <el-divider></el-divider>
        <div class="tags-list" v-if="selectList">
          <div class="one" v-for="(item, index) in selectList" :key="index">
            <div class="tag-left">
              <i class="iconfont" :class="iconList[index]"></i>
              <span>{{ item.name }}</span>
            </div>
            <div class="tag-right">
              <el-button
                plain
                size="mini"
                type="info"
                v-for="child in item.data"
                :key="child.name"
                @click="setTagName(child.name)"
                >{{ child.name }}</el-button
              >
              <el-divider></el-divider>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 热门标签区域 -->
    <div class="right">
      <span
        v-for="(item, index) in showList"
        :key="item.id"
        :class="{ activeCss: index === activeIndex }"
        @click="activeTag(index)"
        >{{ item.name }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tags',
  props: {
    // 选择数据
    selectList: {
      type: Array,
      default() {
        return []
      }
    },
    // 展示数据
    showList: {
      type: Array,
      default() {
        return []
      }
    },
    // 图标
    iconList: {
      type: Array,
      default() {
        return []
      }
    },
    clickTag: {
      type: String,
      default: '华语'
    }
  },
  data() {
    return {
      // 选择的tag
      selectData: '',
      // 选中的展示tag角标
      activeIndex: 0,
      // 全部分类是否显示的 状态
      isShow: false
    }
  },
  watch: {
    showList: {
      handler() {
        // 防止selectData 没有数据
        this.selectData =
          this.showList && this.showList[0] && this.showList[0].name
        const index = this.showList.findIndex(
          (item) => item.name === this.clickTag
        )
        if (index < 0) {
          this.activeIndex = -1
        } else {
          this.activeIndex = index
        }
      },
      deep: true,
      immediate: true
    },
    clickTag(newV, oldV) {
      const index = this.showList.findIndex(
        (item) => item.name === newV
      )
      if (index < 0) {
        this.activeIndex = -1
      } else {
        this.activeIndex = index
      }
    }
  },
  methods: {
    // 点击展示的tag
    activeTag(index) {
      this.selectData = this.showList[index].name
      this.activeIndex = index
      this.$emit('activeTag', this.showList[index].name)
    },
    // 点击全部分类按钮
    clickbutton() {
      this.isShow = !this.isShow
    },
    // 更新选择的 tag
    setTagName(name) {
      this.selectData = name
      this.isShow = !this.isShow
      this.$emit('activeTag', name)
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  .left {
    position: relative;
    .all-tag {
      z-index: 9999;
      background-color: #808080;
      color: white;
      overflow: auto;
      width: 300px;
      height: 180px;
      border: 1px solid gray;
      position: absolute;
      top: 40px;
      border-radius: 5px;
      padding: 10px;
      .el-divider {
        margin: 5px 0;
      }
      .tags-list {
        .one {
          display: flex;
        }
        .tag-left {
          min-width: 80px;
          border-right: 1px solid grey;
          display: flex;
          font-size: 14px;
          i {
            margin-right: 5px;
          }
        }
        .tag-right {
          display: flex;
          flex-wrap: wrap;
          justify-content: start;
          .el-button {
            margin: 5px 5px;
          }
        }
      }
    }
    .icon {
      position: absolute;
      left: 15px;
      bottom: -16px;
      color: gray;
    }
  }
  .right {
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    span {
      margin: 10px;
      color: gray;
      font-size: 16px;
      &:hover {
        cursor: pointer;
      }
    }
    .activeCss {
      color: #f45252;
      font-size: 18px;
    }
  }
}
</style>
