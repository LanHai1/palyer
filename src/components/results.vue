<template>
  <div class="result-wrapper">
    <div class="song" v-for="item in songsList" :key="item.id">
      <div class="name">
        <span class="iconfont icon-play" @click="playerSong(item.id)"></span>
        <span class="resultName">{{item.name}}</span>
        <span class="iconfont icon-editmedia"></span>
      </div>
      <div class="singer">{{item.artists | formatSinger}}</div>
      <div class="album">《{{item.album.name}}》</div>
      <div class="time">{{item.duration | formatTime }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "results",
  data() {
    return {
      // 歌单列表
      songsList: []
    };
  },
  created() {
    // 获取歌单列表
    this.$axios
      .get("http://localhost:3000/search", {
        params: {
          keywords: this.$route.params.keywords
        }
      })
      .then(res => {
        this.songsList = res.data.result.songs;
      });
  },
  filters: {
    // 歌曲时长处理
    formatTime(time) {
      // 分钟
      const minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60));
      // 毫秒
      const seconds =
        Math.ceil((time % (1000 * 60)) / 1000) == 10
          ? Math.ceil((time % (1000 * 60)) / 1000)
          : Math.ceil((time % (1000 * 60)) / 1000) > 10
          ? Math.ceil((time % (1000 * 60)) / 1000)
          : "0" + Math.ceil((time % (1000 * 60)) / 1000);
      return minutes + ":" + seconds;
    },
    // 歌手处理
    formatSinger(singer) {
      let allSinger = "";
      singer.forEach(val => {
        allSinger += val.name + "/";
      });
      // 删除字符串的最后一个字符
      return allSinger.substr(0, allSinger.length - 1);
    }
  },
  methods: {
    // 歌曲播放
    playerSong(id) {
      // 传递歌曲id给父组件
      this.$emit("event", { id });
      // 编程式路由跳转
      this.$router.replace(`/player/${id}`)
    }
  }
};
</script>

<style>
@import url("../assets/css/results.css");
@import url("../assets/css/iconfont.css");
.resultName {
  width: 400px;
  float: left;
  padding-left: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.icon-play {
  float: left;
}
.icon-editmedia {
  float: left;
}
</style>
