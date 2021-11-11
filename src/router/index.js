import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
import Found from './found'
import Detail from './detail'
import Profile from './profile'
Vue.use(VueRouter)

// 解决vue-router在3.o版本以上重复点击报错问题
// 将vue-router的push方法加上catch来解决
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/found'
  },
  // 发现页面路由
  Found,
  // 详情页路由
  ...Detail,
  // 个人主页
  ...Profile,
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/video',
        name: 'Video',
        component: () => import('@/views/video/Video')
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/live',
        name: 'Live',
        component: () => import('@/views/live/Live')
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/radio',
        name: '/Radio',
        component: () => import('@/views/radio/Radio')
      }
    ]
  },
  {
    path: '',
    component: () => import('@/views/login/Index'),
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/childComps/Login'),
        meta: { title: '登录' }
      },
      {
        path: '/signup',
        name: 'Signup',
        component: () => import('@/views/login/childComps/Signup'),
        meta: { title: '注册' }
      }
    ]
  },
  // 404页面
  {
    path: '*',
    name: 'Error404',
    component: () => import('@/views/error/Error404'),
    meta: { title: '页面未找到' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
