<template>
  <div class="song-list">
    <!-- 精选歌单区域 -->
    <div class="highquality" ref="highquality"
     @click="clickPlay(playlists.id)">
      <div class="fuzzy" :style="background"></div>
      <img v-lazy="playlists.coverImgUrl" alt="" />
      <div class="msg-area">
        <p><i class="iconfont icon-huangguan"></i>精品歌单</p>
        <span class="one">{{playlists.name}}</span>
        <span class="two">{{playlists.description}}</span>
      </div>
    </div>
    <!-- 选则区域 -->
    <Tags :clickTag="clickTag" @activeTag=activeTag :showList="showTags" :selectList="tagsAll" :iconList="iconList"/>
    <!-- 歌单区域 -->
    <RecommendList @clickPlay="clickPlay" :list="result"/>
    <!-- 分页区域 -->
    <Pagination @updataData="queryInfoChange" :queryInfo="queryInfo" :device="device" :total="total" :pageSizes="[50, 100, 150, 200]"/>
  </div>
</template>

<script>
// tags 组件
import Tags from '@/components/tags'
// 推荐列表 组件
import RecommendList from '@/components/recommendList'
// 分页
import Pagination from '@/components/pagination'
// 网络数据
import {
  getPlayHot,
  getHighquality,
  getHighqualityTags,
  getTagsListAll,
  getPlaylist
} from '@/api/found/recommend'
export default {
  name: 'SongList',
  components: {
    Tags,
    RecommendList,
    Pagination
  },
  computed: {
    // 监听 页面变化 PC or modil
    device() {
      return this.$store.state.app.device === 'desktop'
    }
  },
  data() {
    return {
      // 精品歌单标签
      tags: {},
      // 精选歌单
      playlists: [],
      // 头部背景图
      background: {
        backgroundImage: '',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '100%'
      },
      // 全部歌单分类
      tagsAll: [],
      // 展示的歌单
      showTags: [],
      // 图标
      iconList: ['icon-duoyuyan', 'icon-fengge', 'icon-changjing', 'icon-qingganganqing', 'icon-pifuzhuti-xianxing'],
      // 数据总条数
      total: 0,
      queryInfo: {
        tag: '华语',
        // 当前的页数
        pagenum: 1,
        // 当前每次显示多少条数据
        pagesize: 50
      },
      // 歌单数据
      result: [],
      clickTag: '华语'
    }
  },
  created() {
    this.getHighqualityTags()
    this.getPlayHot()
    this.getTagsListAll()
    this.getPlaylist(this.queryInfo)
  },
  methods: {
    // 精品歌单标签
    async getHighqualityTags() {
      const { code, tags } = await getHighqualityTags()
      if (code !== 200) return this.$message('error', '精品歌单标签获取失败')
      const newTags = this.$_.sample(tags)
      this.tags = newTags
      this.getHighquality(newTags.name)
    },
    // 获取精选歌单
    async getHighquality(cat) {
      const { code, playlists } = await getHighquality(cat)
      if (code !== 200) return this.$message('error', '获取精选歌单失败')
      this.background.backgroundImage = `url('${playlists[0].coverImgUrl}')`
      this.playlists = playlists[0]
    },
    // 热门歌单分类
    async getPlayHot() {
      const { tags, code } = await getPlayHot()
      if (code !== 200) return this.$message('error', '热门歌单分类获取失败')
      this.showTags = tags
    },
    // 全部歌单分类数据
    async getTagsListAll() {
      const { code, categories, sub } = await getTagsListAll()
      if (code !== 200) return this.$message('error', '全部歌单分类获取失败')
      const keys = Object.keys(categories)
      this.tagsAll = []
      keys.forEach(key => {
        const data = sub.filter(item => item.category + '' === key)
        this.tagsAll.push({ name: categories[key], data })
      })
    },
    // 根据分类获取歌单
    async getPlaylist(queryInfo) {
      const { code, playlists, total } = await getPlaylist(queryInfo)
      if (code !== 200) return this.$message('error', '歌单获取失败')
      this.total = total
      this.result = playlists
    },
    // 监听子组件选择的 tag
    activeTag(tag) {
      const data = this.$_.find(this.showTags, (o) => {
        return o.name === tag
      })
      if (data) {
        this.clickTag = tag
      } else {
        this.clickTag = ''
      }
      this.queryInfo.tag = tag
      this.getPlaylist(this.queryInfo)
      console.log(tag)
    },
    // 页码改变数据刷新
    queryInfoChange(val) {
      this.getPlaylist(this.queryInfo)
    },
    // 监听点击的 歌单id 获取歌单详情
    clickPlay(id) {
      console.log(id)
      this.$router.push({ name: 'Detail', params: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.song-list {
  .highquality {
     &:hover{
          cursor: pointer;
        }
    position: relative;
    height: 160px;
    width: 100%;
    background-size: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;
    padding: 15px;
    box-sizing: border-box;
    .fuzzy {
      z-index: -1;
      position: absolute;
      height: 100%;
      width: 100%;
      filter: blur(30px);
    }
    img {
      height: 100%;
      border-radius: 5px;
    }
    .msg-area {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 100%;
      padding: 5px 0;
      box-sizing: border-box;
      margin-left: 10px;
      p {
        border: 1px solid #FBBE50;
        border-radius: 20px;
        color: #FBBE50;
        padding: 8px;
        margin: 0;
        width: 90px;
        i{
          margin-right: 5px;
        }
      }
      .one{
        color: white;
      }
      .two{
        height: 28px;
        color: #D6D4D2;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
  }
}
.el-pagination{
  text-align: center;
  margin-top: 20px;
}
</style>
