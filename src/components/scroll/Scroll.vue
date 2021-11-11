<template>
  <div class="wrapper" ref='wrapper'>
    <div class="content">
      <slot></slot>
    </div>
    <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
  </div>
</template>

<script>
// 引入better-scroll
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 3
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  // 组件创建完加载
  mounted() {
    // 组件创建完加载后初始化 better-scroll 防止类名获取不到
    // ①:let wrapper = document.querySelector('.wrapper')
    // this.scroll = new BScroll(wrapper)

    // ②:通过this.$refs.'name' 来获取对应的dom
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true, // BetterScroll 默认会阻止浏览器的原生 click 事件。
      // 当设置为 true，BetterScroll 会派发一个 click 事件
      probeType: this.probeType, // 决定是否派发 scroll 事件 可选值:1|2|3
      pullUpLoad: this.pullUpLoad
    })

    // 当probeType 为2|3 时 才能获取滚动的位置 第二个参数p为位置坐标
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', p => {
        // 传给父组件
        this.$emit('scroll', p)
      })
    }

    // 监听上拉加载事件 pullUpLoad为true时监听
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // 传给父组件
        this.$emit('upLoad')
      })
    }
  },
  methods: {

    /**
       * 返回顶部方法
       * @param {
       * x:x轴位置
       * y:y轴位置
       * time:返回时间,默认300毫秒
       * }
       */
    scrollTo(x, y, time = 300) {
      // 防止 this.scroll 为null 造成异常
      this.scroll && this.scroll.scrollTo(x, y, time)
    },

    /**
       * 解决 better-scroll 上拉加载事件只会执行一次问题
       * 调用：finishPullUp()方法
       */
    finishPullUp() {
      // 防止 this.scroll 为null 造成异常
      this.scroll && this.scroll.finishPullUp()
    },

    /**
       * 解决 BetterScroll 刷新重新计算
       * 调用：refresh()方法
       */
    refresh() {
      this.scroll && this.scroll.refresh()
    },

    /**
       * 获取 better-scroll 滚动的位置（y）
       * 调用：y方法
       */
    getScrollY() {
      return this.scroll && this.scroll.y
    },
    /**
     * el, time, offsetX, offsetY, easing
     * 滚动到某个元素，el（必填）表示 dom 元素
     * time 表示动画时间
     * offsetX 和 offsetY 表示坐标偏移量
     * easing 表示缓动函数
     */
    scrollToElement(el, offsetY, time) {
      return this.scroll.scrollToElement(el, time, 0, offsetY, 'easing')
    }

  }

}
</script>

<style>

</style>
