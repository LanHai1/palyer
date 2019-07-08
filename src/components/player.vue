<template>
  <div class="player">
    <div class="left">
      <img class="disc" src="../assets/img/disc.png" alt />
      <img class="cover" src="../assets/img/cover.png" alt />
    </div>
    <div class="right">
      <div class="title">
        <img src="../assets/img/tag.png" alt />
        <span>{{musicName}}</span>
      </div>
      <div class="singer">
        歌手:
        <span>{{singerName}}</span>
      </div>
      <div class="album">
        所属专辑:
        <span>{{artistName}}</span>
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
      lyricList: [],
      // 歌曲名字
      musicName: "来自天堂的魔鬼",
      // 歌手名
      singerName: "邓紫棋",
      // 所属专辑
      artistName: "新的心跳"
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
    // 本地存储获取歌单信息
    let musicDetails = JSON.parse(localStorage.getItem("musicDetails") || "{}");
    // 有值
    if (musicDetails.musicName !== undefined) {
      this.musicName = musicDetails.musicName;
      this.singerName = musicDetails.singerName;
      this.artistName = musicDetails.artistName;
    }
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
