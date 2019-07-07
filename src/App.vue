<template>
  <div id="player">
    <h2 class="title">某云音乐</h2>
    <div class="search">
      <input type="text" v-model.trim.lazy="musci" @keyup.enter="searchMusci" />
      <button>
        <span class="iconfont icon-search"></span>
      </button>
    </div>
    <div class="tab-wrapper">
      <!-- tab栏 -->
      <div class="tab-bar">
        <router-link active-class="active" :to="'/results/'+musci" tag="span" class="bar-item">搜索结果</router-link>
        <router-link active-class="active" to="/player" tag="span" class="bar-item">歌词</router-link>
        <router-link active-class="active" to="/video" tag="span" class="bar-item">mv</router-link>
        <router-link active-class="active" to="/comment" tag="span" class="bar-item">歌曲评论</router-link>
      </div>
      <!-- 对应的内容区域 -->
      <router-view :key="key"></router-view>
    </div>
    <audio class="audio" controls src></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 搜索歌曲
      musci: "邓紫棋"
    };
  },
  methods: {
    // 搜索 编程式路由
    searchMusci() {
      this.$router.push(`/results/${this.musci}`);
    }
  },
  computed: {
    // 强制刷新 router-view
    key() {
      return this.$route.path + Math.random();
    }
  },
  created() {
    // 默认首页路由到搜索歌单
    this.$router.push(`/results/${this.musci}`);
  },
};
</script>

<style>
@import url("./assets/css/index.css");
@import url("./assets/css/iconfont.css");
.audio {
  width: 100%;
}
</style>
