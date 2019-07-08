<template>
  <div class="video" ref="vvio">
    <div>
      <div class="title-wrapper">
        <span class="tag">MV</span>
        <span class="title">{{name}}</span>
        <span class="artist">{{artistName}}</span>
      </div>
      <video :src="videoURL" ref="videoMy" controls autoplay="autoplay" @play="play"></video>
    </div>
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
      videoURL: "",
      // 滚动
      myScroll: undefined
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
  },
  mounted() {
    // 滚动条
    // this.myScroll = new this.$iscroll(this.$refs.vvio, {
    //   mouseWheel: true // 开启鼠标滚轮支持
    // });
  },
  updated() {
    // 刷新滚动;
    // this.myScroll.refresh();
  }
};
</script>

<style>
@import url("../assets/css/video.css");
</style>
