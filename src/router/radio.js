import Layout from '@/layout'
export default {
  path: '',
  component: Layout,
  children: [
    {
      path: '/radio',
      name: 'Radio',
      redirect: '/radio/first',
      component: () => import('@/views/radio/Radio'),
      children: [
        {
          path: '/radio/first',
          name: 'First',
          component: () => import('@/views/radio/First'),
          meta: { title: '电台' }
        },
        {
          path: '/radio/radioItem/:id',
          name: 'RadioItem',
          component: () => import('@/views/radio/RadioItem'),
          meta: { title: '分类' }
        }
      ]
    },
    {
      path: '/radio/recommendMore',
      name: 'RecommendMore',
      component: () => import('@/views/radio/childComps/RecommendMore'),
      meta: { title: '电台详情' }
    },
    {
      path: '/radio/showOut',
      name: 'ShowOut',
      component: () => import('@/views/radio/childComps/ShowOut'),
      meta: { title: '电台节目详情' }
    }
  ]
}
