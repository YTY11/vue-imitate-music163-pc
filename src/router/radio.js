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
          component: () => import('@/views/radio/First')
        }
      ]
    },
    {
      path: '/radio/recommendMore',
      name: 'RecommendMore',
      component: () => import('@/views/radio/childComps/RecommendMore')
    },
    {
      path: '/radio/showOut',
      name: 'ShowOut',
      component: () => import('@/views/radio/childComps/ShowOut')
    }
  ]
}
