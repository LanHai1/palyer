<template>
  <div class="player">
    <div class="left">
      <img class="disc" src="../assets/img/disc.png" alt />
      <img class="cover" src="../assets/img/cover.png" alt />
    </div>
    <div class="right">
      <div class="title">
        <img src="../assets/img/tag.png" alt />
        <span>放个大招给你看</span>
      </div>
      <div class="singer">
        歌手:
        <span>尼古拉斯赵四</span>
      </div>
      <div class="album">
        所属专辑:
        <span>我就是我</span>
      </div>
      <ul class="lyric-container">
        <li class="lyric" v-for="(item, index) in lyricList" :key="index">{{item | formatLyric}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "player",
  data() {
    return {
      // 歌词数组
      lyricList: []
    };
  },
  created() {
    // 获取歌词
    this.$axios
      .get("http://localhost:3000/lyric", {
        params: {
          id: this.$route.params.id
        }
      })
      .then(res => {
        this.lyricList = res.data.lrc.lyric.split(/\n/);
      });
  },
  filters: {
    // 处理歌词
    formatLyric(val) {
      // 从尾部查找
      if (val.lastIndexOf("]") != "-1") {
        // 返回索引位置到字符串的结尾
        return val.slice(val.lastIndexOf("]") + 1);
      } else {
        return val;
      }
    }
  }
};
</script>

<style>
@import url("../assets/css/player.css");
</style>
