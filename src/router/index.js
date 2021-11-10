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
            meta: { title: '个性推荐' }
          },
          {
            path: 'songList',
            name: 'SongList',
            component: () => import('@/views/found/childComps/SongList'),
            meta: { title: '歌单' }
          },
          {
            path: 'rankingList',
            name: 'RankingList',
            component: () => import('@/views/found/childComps/RankingList'),
            meta: { title: '排行榜' }
          },
          {
            path: 'singer',
            name: 'Singer',
            component: () => import('@/views/found/childComps/Singer'),
            meta: { title: '歌手' }
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
    component: Layout,
    children: [
      {
        path: '/details/:id/:title?',
        name: 'Detail',
        component: () => import('@/views/details'),
        meta: { title: '详情页' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/singerDetail/:id',
        name: 'SingerDetail',
        component: () => import('@/views/singerDetail'),
        meta: { title: '歌手详情页' }
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
