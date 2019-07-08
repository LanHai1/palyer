<template>
  <div class="comment-wrapper" ref="wrappers">
    <transition-group name="slide" tag="div" class="items">
      <div
        class="item"
        v-for="(item, index) in commentsList"
        :style="{transitionDuration:index*300+'ms'}"
        :key="index"
      >
        <div class="left">
          <img :src="item.user.avatarUrl" alt />
        </div>
        <div class="right">
          <div class="top">
            <span class="user">{{item.user.nickname}}:</span>
            <span class="content">{{item.content}}</span>
          </div>
          <div class="bottom">
            <div class="time">{{item.time | translateDate}}</div>
            <div class="like-wrapper">
              <span>👍</span>
              ({{item.likedCount}})
            </div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "comment",
  data() {
    return {
      // 评论数组
      commentsList: [],
      // 滚动
      myScroll: undefined
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
    // // 播放音乐
    // this.$emit("playMusci");
  },
  mounted() {
    // 滚动条
    this.myScroll = new this.$iscroll(this.$refs.wrappers, {
      mouseWheel: true // 开启鼠标滚轮支持
    });
  },
  filters: {
    translateDate: function(current_date) {
      let date = new Date(current_date);
      let datetime =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1 >= 10
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)) +
        "-" +
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
        " " +
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
        ":" +
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
      return datetime;
    }
  },
  updated() {
    // 刷新滚动
    this.myScroll.refresh();
  }
};
</script>

<style>
@import url("../assets/css/comment.css");
/* 评论列表动画 */
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter,
.slide-leave-to {
  transform: translateY(50px);
  /* opacity: 0; */
}

.top,
.time {
  cursor: default;
}
</style>
