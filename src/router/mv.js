import Layout from '@/layout'
export default {
  path: '',
  component: Layout,
  children: [
    {
      path: '/mv',
      name: 'MV',
      redirect: '/mv/netease',
      component: () => import('@/views/mv/MV'),
      children: [
        {
          path: '/mv/netease',
          name: 'Netease',
          component: () => import('@/views/mv/childComps/Netease'),
          meta: { title: '网易出品' }
        },
        {
          path: '/mv/classify',
          name: 'Classify',
          component: () => import('@/views/mv/childComps/Classify'),
          meta: { title: 'MV分类' }
        },
        {
          path: '/mv/TopMV',
          name: 'TopMV',
          component: () => import('@/views/mv/childComps/TopMV'),
          meta: { title: 'MV排行榜' }
        },
        {
          path: '/mv/NewMV',
          name: 'NewMV',
          component: () => import('@/views/mv/childComps/NewMV'),
          meta: { title: '最新MV' }
        }
      ]
    }
  ]
}
