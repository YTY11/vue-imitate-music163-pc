import Layout from '@/layout'
export default {
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
}
