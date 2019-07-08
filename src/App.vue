<template>
  <div id="player">
    <h2 class="title">某云音乐</h2>
    <div class="search">
      <input type="text" v-model.trim.lazy="musci" @keyup.enter="searchMusci" />
      <button @click="searchMusci">
        <span class="iconfont icon-search"></span>
      </button>
    </div>
    <div class="tab-wrapper">
      <!-- tab栏 -->
      <div class="tab-bar">
        <router-link active-class="active" :to="'/results/'+musci" tag="span" class="bar-item">搜索结果</router-link>
        <router-link active-class="active" :to="'/player/'+musciId" tag="span" class="bar-item">歌词</router-link>
        <router-link active-class="active" to="/comment" tag="span" class="bar-item">歌曲评论</router-link>
        <router-link active-class="active" to="/video" tag="span" class="bar-item">mv</router-link>
      </div>
      <!-- 对应的内容区域 -->
      <router-view :key="key" @event="receiveData" ref="childView" ></router-view>
    </div>
    <audio
      class="audio"
      controls
      autoplay="autoplay"
      ref="audioEL"
      @play="play"
      @pause="pause"
      :src="musciURL"
    ></audio>
  </div>
</template>

<script>

export default {
  data() {
    return {
      // 搜索歌曲
      musci: "邓紫棋",
      // 歌曲URL
      musciURL: "",
      // 歌曲id
      musciId: 36270426
    };
  },
  methods: {
    // 搜索 编程式路由
    searchMusci() {
      // 存储历史记录
      localStorage.setItem(
        "searchMusci",
        JSON.stringify({
          musci: this.musci
        })
      );
      this.$router.push(`/results/${this.musci}`);
    },
    // 接受子组件传递过来的数据
    receiveData(val) {
      const { id } = val;
      // 查询是否有版权
      // 版权404错误 未解决
      this.$axios
        .get("http://localhost:3000/check/music", {
          params: {
            id
          }
        })
        .then(() => {})
        .catch(() => {
          // 没版权
          alert("暂没版权");
        });
      // 设置歌曲id
      this.musciId = id;
      // 搜索歌曲url
      this.$axios
        .get("http://localhost:3000/song/url", {
          params: {
            id
          }
        })
        .then(res => {
          // 设置歌曲自动播放
          this.musciURL = res.data.data[0].url;
        });
    },
    // 播放
    play() {
      this.$refs.childView.playOrPause(true);
    },
    // 暂停
    pause() {
      // 调用子组件的方法
      this.$refs.childView.playOrPause(false);
    }
  },
  computed: {
    // 强制刷新 router-view
    key() {
      return this.$route.path + Math.random();
    }
  },
  created() {
    // 历史记录歌曲搜索
    const { musci } = JSON.parse(localStorage.getItem("searchMusci") || "{}");
    if (musci !== undefined) {
      this.musci = musci;
    }

    // 默认首页路由到搜索歌单
    this.$router.push(`/results/${this.musci}`);
  }
};
</script>

<style>
@import url("./assets/css/index.css");
@import url("./assets/css/iconfont.css");
.audio {
  width: 100%;
}
</style>
