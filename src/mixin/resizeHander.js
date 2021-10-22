import store from '@/store'

const { body } = document
const WIDTH = 992 // 最小PC窗口

export default {
  beforeMount() {
    // 监听窗口变化
    window.addEventListener('resize', this.resizeHander)
  },
  beforeDestroy() {
    // 退出 销毁监听事件
    window.removeEventListener('resize', this.resizeHander)
  },
  mounted() {
    store.dispatch('app/setDevice', this.isMobile() ? 'mobile' : 'desktop')
  },
  methods: {
    // 判断窗口大小 设置界面为PC 还是 移动
    // true 为 移动
    // false 为 PC
    isMobile() {
      // 获取窗口的大小
      const rect = body.getBoundingClientRect().width
      return rect - 1 < WIDTH
    },
    // 模式切换
    resizeHander() {
      if (this.isMobile()) {
        store.dispatch('app/setDevice', 'mobile')
      } else {
        store.dispatch('app/setDevice', 'desktop')
      }
    }
  }
}
