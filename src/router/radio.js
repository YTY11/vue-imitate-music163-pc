import Layout from '@/layout'
export default {
  path: '',
  component: Layout,
  children: [
    {
      path: '/radio',
      name: 'Radio',
      component: () => import('@/views/radio/Radio')
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
