import Layout from '@/layout'
export default [
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
    component: Layout,
    children: [
      {
        path: '/mvDetail/:id',
        name: 'MvDetail',
        component: () => import('@/views/mvDetail'),
        meta: { title: 'MV详情页' }
      }
    ]
  }
]
