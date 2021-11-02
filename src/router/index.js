import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
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
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/found',
        name: 'Found',
        redirect: '/found/personality',
        component: () => import('@/views/found/Found'),
        meta: { title: '发现音乐' },
        children: [
          {
            path: 'personality',
            name: 'Personality',
            component: () => import('@/views/found/childComps/Personality'),
            meta: { title: '发现音乐' }
          },
          {
            path: 'songList',
            name: 'SongList',
            component: () => import('@/views/found/childComps/SongList'),
            meta: { title: '歌单' }
          }
        ]
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/details/:id',
        name: 'Detail',
        component: () => import('@/views/details'),
        meta: { title: '详情页' }
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
    name: 404,
    component: () => improt('@/view/error/404'),
    meta: { title: '页面未找到' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
