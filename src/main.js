import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 样式初始化
import 'normalize.css/normalize.css'
// 引入字体图标
import '@/assets/font/iconfont.css'
// element-ui 按需引入
import '@/plugins/element'
//  animate动画
import 'animate.css'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
// 引入lodash
import _ from 'lodash'
Vue.prototype.$_ = _
Vue.config.productionTip = false

// 配置项
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/img/error_img.png'),
  loading: require('./assets/img/loading_img.gif'),
  attempt: 3
})
// 事件总线
Vue.prototype.$bus = new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
