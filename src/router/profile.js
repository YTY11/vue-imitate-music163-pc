import Layout from '@/layout'
export default [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/singerProfile/:id',
        name: 'SingerProfile',
        component: () => import('@/views/profile/SingerProfile'),
        meta: { title: '歌手个人主页' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/profile/:id',
        name: 'Profile',
        component: () => import('@/views/profile/Profile'),
        meta: { title: '个人主页' }
      }
    ]
  }
]
