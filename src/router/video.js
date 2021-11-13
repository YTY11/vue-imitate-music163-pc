import Layout from '@/layout'
export default [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/video',
        name: 'Video',
        redirect: '/video/videoRecommend',
        component: () => import('@/views/video/Video'),
        children: [
          {
            path: '/video/videoRecommend',
            name: 'VideoRecommend',
            component: () => import('@/views/video/childComps/VideoRecommend'),
            meta: { title: '视频推荐' }
          },
          {
            path: '/video/videoGroup',
            name: 'VideoGroup',
            component: () => import('@/views/video/childComps/VideoGroup'),
            meta: { title: '视频分类' }
          }
        ]
      }
    ]
  }
]
