<template>
  <div>
    <div class="item" v-if="item">
      <img v-lazy="item.user.avatarUrl" alt="" />
      <div class="info">
        <p>
          <span class="name">{{ item.user.nickname }}</span>
          <img
            class="vip"
            v-if="item.user.vipRights"
            :src="vipType(item.user.vipRights.redVipLevel)"
            alt=""
          />: {{ item.content }}
        </p>
        <p
          class="child-p"
          v-for="d in item.beReplied"
          :key="d.beRepliedCommentId"
        >
          <span class="name">{{ d.user.nickname }}</span>: {{ d.content }}
        </p>
        <p class="bottom">
          <span class="time">{{ item.time | dateFormat }}</span>
          <span class="iconfont icon-good name"
            >({{ item.likedCount }}) | <span>回复</span></span
          >
        </p>
      </div>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
import Vip1 from '@/assets/img/vip1.png'
import Vip2 from '@/assets/img/vip2.png'
import Vip3 from '@/assets/img/vip3.png'
import Vip4 from '@/assets/img/vip4.png'
import Vip5 from '@/assets/img/vip5.png'
import Vip6 from '@/assets/img/vip6.png'
import { dateFormat } from '@/utility/utils'
export default {
  name: 'CommentItem',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      vipImg: ''
    }
  },
  filters: {
    dateFormat(time) {
      return dateFormat('YYYY年MM月DD日 hh:mm:ss', new Date(time))
    }
  },
  methods: {
    // vip 等级返回对应图标
    vipType(type) {
      switch (type) {
        case 0:
          break
        case 1:
          this.vipImg = Vip1
          break
        case 2:
          this.vipImg = Vip2
          break
        case 3:
          this.vipImg = Vip3
          break
        case 4:
          this.vipImg = Vip4
          break
        case 5:
          this.vipImg = Vip5
          break
        case 6:
          this.vipImg = Vip6
          break
        default:
          this.vipImg = Vip6
          break
      }
      return this.vipImg
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  &:hover {
    cursor: pointer;
  }
  display: flex;
  img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }
  .vip {
    height: 16px;
    vertical-align: middle;
    margin-left: 5px;
  }
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 10px;
    box-sizing: border-box;
    p {
      font-size: 14px;
      margin: 0;
      line-height: 20px;
    }
    .name {
      color: #70a5d1;
    }
    .time {
      color: gray;
    }
    .icon-good {
      margin-left: auto;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .child-p {
      padding: 10px;
      box-sizing: border-box;
      background: #F0F0F0;
    }
  }
}
</style>
