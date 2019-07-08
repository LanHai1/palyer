<template>
  <div class="player">
    <div class="left">
      <img class="autoRotate disc" :class="{playing:isPlaying}" src="../assets/img/disc.png" alt />
      <img
        class="autoRotate cover"
        :class="{playing:isPlaying}"
        :src="albumIMG?albumIMG:'../assets/img/cover.png'"
        alt
      />
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
      <transition-group class="lyric-container" tag="ul" name="fade">
        <li
          class="lyric"
          v-for="(item, index) in lyricList"
          :key="index"
          :style="{transitionDelay: 100*index+'ms'}"
        >{{item | formatLyric}}</li>
      </transition-group>
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
      artistName: "新的心跳",
      // 专辑id
      albumID: 39483040,
      // 专辑图片
      albumIMG: "",
      // 专辑转转转
      isPlaying: false
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
        // 专辑转转转
        this.isPlaying = true;
      });
    // 本地存储获取歌单信息
    let musicDetails = JSON.parse(localStorage.getItem("musicDetails") || "{}");
    // 有值
    if (musicDetails.musicName !== undefined) {
      this.musicName = musicDetails.musicName;
      this.singerName = musicDetails.singerName;
      this.artistName = musicDetails.artistName;
      this.albumID = musicDetails.albumID;
    }
    // 获取专辑图片
    this.$axios
      .get(`http://localhost:3000/album?id=${this.albumID}`)
      .then(res => {
        this.albumIMG = res.data.songs[0].al.picUrl;
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
  },
  mounted() {
    // // // 播放音乐
    // this.$emit("playMusci");
  },
  methods: {
    // 暂停or播放 转转转
    playOrPause(boolean) {
      this.isPlaying = boolean;
    }
  }
};
</script>

<style>
@import url("../assets/css/player.css");
/* 专辑旋转 */
.autoRotate {
  animation-name: Rotate;
  animation-iteration-count: infinite;
  animation-play-state: paused;
  animation-timing-function: linear;
  animation-duration: 5s;
  transform: scale(0.9);
}
.playing {
  animation-play-state: running;
}
@keyframes Rotate {
  0% {
    transform: rotateZ(0) scale(0.8);
  }

  50% {
    transform: rotateZ(180deg) scale(0.9);
  }

  100% {
    transform: rotateZ(360deg) scale(0.8);
  }
}
/* 歌词动画 */
.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter,
.fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
