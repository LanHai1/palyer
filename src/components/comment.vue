<template>
  <div class="comment-wrapper">
    <div class="items">
      <div class="item" v-for="(item, index) in commentsList" :key="index">
        <div class="left">
          <img :src="item.user.avatarUrl" alt />
        </div>
        <div class="right">
          <div class="top">
            <span class="user">{{item.user.nickname}}:</span>
            <span
              class="content"
            >{{item.content}}</span>
          </div>
          <div class="bottom">
            <div class="time">{{item.time}}</div>
            <div class="like-wrapper">
              <span>👍</span>({{item.likedCount}})
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment",
  data() {
    return {
      // 评论数组
      commentsList: []
    };
  },
  created() {
    // 请求评论数据
    this.$axios
      .get("http://localhost:3000/comment/hot", {
        params: {
          id: this.$route.params.id,
          type: 0
        }
      })
      .then(res => {
        this.commentsList = res.data.hotComments;
      });
  }
};
</script>

<style>
@import url("../assets/css/comment.css");
</style>
