<template>
  <div class="video">
    <div class="title-wrapper">
      <span class="tag">MV</span>
      <span class="title">{{name}}</span>
      <span class="artist">{{artistName}}</span>
    </div>
    <video :src="videoURL" ref="videoMy" controls autoplay="autoplay" @play="play"></video>
  </div>
</template>

<script>
export default {
  name: "videos",
  data() {
    return {
      // 歌曲s的作者
      artistName: "",
      // 歌曲名
      name: "",
      // video的地址
      videoURL: ""
    };
  },
  methods: {
    play() {
      this.$emit("stopMusci");
    },
    pauseMV() {
      // 关闭音乐
      // console.log("关闭");
      this.$refs.videoMy.pause();
    }
  },
  created() {
    // 请求video播放地址
    this.$axios
      .get("http://localhost:3000/mv/detail", {
        params: {
          mvid: this.$route.params.mvid
        }
      })
      .then(res => {
        this.artistName = res.data.data.artistName;
        this.name = res.data.data.name;
        this.videoURL = res.data.data.brs["1080"]
          ? res.data.data.brs["1080"]
          : res.data.data.brs["720"]
          ? res.data.data.brs["720"]
          : res.data.data.brs["480"]
          ? res.data.data.brs["480"]
          : res.data.data.brs["240"];
      });
  }
};
</script>

<style>
@import url("../assets/css/video.css");
</style>
