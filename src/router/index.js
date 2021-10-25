import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/Home'),
        meta: { title: '首页' }
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
