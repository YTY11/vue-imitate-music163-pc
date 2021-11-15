import router from './router'
import { getToken } from '@/utility/user'
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.name === 'VideoRecommend' || to.name === 'VideoGroup') {
    if (!getToken()) {
      // 没有登录
      alert('此功能需要登录')
      next('/login')
    } else {
      // 已经登录
      next()
    }
  }
  next()
})
