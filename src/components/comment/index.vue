<template>
  <div class="comment" v-if="commentsInfo">
    <!-- 评论区域 -->
    <h2>
      评论
      <span class="comment-span">共{{ commentsInfo.total }}条评论</span>
    </h2>
    <el-divider class="comment-one-divider"></el-divider>
    <!-- 评论输入框 -->
    <div class="textarea">
      <el-input
        type="textarea"
        placeholder="请输入评论内容"
        v-model="commentText"
        maxlength="140"
        show-word-limit
        :autosize="{ minRows: 3, maxRows: 4 }"
        resize="none"
      >
      </el-input>
      <el-button type="primary" size="mini">评论</el-button>
    </div>
     <h3 v-if="getCommentInfo.pagenum === 1">精彩评论</h3>
    <el-divider v-if="getCommentInfo.pagenum === 1"></el-divider>
    <CommentItem v-for="item in commentsInfo.hotComments" :key="item.commentId" :item="item"/>
    <h3>最新评论({{commentsInfo.total}})</h3>
    <el-divider></el-divider>
    <CommentItem v-for="item in commentsInfo.comments" :key="item.commentId" :item="item"/>
  </div>
</template>

<script>
import CommentItem from './CommentItem'
export default {
  name: 'Comment',
  components: {
    CommentItem
  },
  props: {
    // 获取评论的参数
    getCommentInfo: {
      type: Object,
      defatul() {
        return {}
      }
    },
    // 评论数据
    commentsInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      // 评论的信息
      commentText: ''
    }
  }
}
</script>

<style lang="scss" scoped>
 h2 {
    margin-bottom: 10px;
  }
  h3{
    margin-bottom: 10px;
  }
  .comment-one-divider {
    background-color: red;
  }

  .el-divider {
    margin: 0 0 20px 0;
  }
  .textarea {
    width: 100%;
    text-align: end;
    .el-button {
      margin: 10px 0;
    }
  }
  ::v-deep .el-textarea__inner:focus {
  border: 1px solid red;
}
</style>
