<template>
  <div class="result-wrapper" ref="res">
    <transition-group name="slide-fade" tag="div">
      <div
        class="song"
        v-for="(item,index) in songsList"
        :key="item.id"
        :style="{transitionDelay: index*100+'ms'}"
        @dblclick.stop="dblClickComment({id:item.id,musicName:item.name,
          singerName:item.artists,
          artistName:item.album.name,
          albumID:item.album.id
          })"
      >
        <div class="name">
          <span
            class="iconfont icon-play"
            @click.stop="playerSong({id:item.id,musicName:item.name,
          singerName:item.artists,
          artistName:item.album.name,
          albumID:item.album.id
          })"
          ></span>
          <span class="resultName">{{item.name}}</span>
          <span class="iconfont icon-editmedia" v-if="item.mvid!==0" @click="goMv(item.mvid)"></span>
        </div>
        <div class="singer">{{item.artists | formatSinger}}</div>
        <div class="album">《{{item.album.name}}》</div>
        <div class="time">{{item.duration | formatTime }}</div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "results",
  data() {
    return {
      // 歌单列表
      songsList: [],
      // 滚动
      myScroll: undefined
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
    playerSong(val) {
      // 本地存储数据
      this.localStorageSet(val);

      const { id } = val;
      // 传递歌曲id给父组件
      this.$emit("event", { id });
      // 编程式路由跳转
      this.$router.replace(`/player/${id}`);
    },
    // 双击评论
    dblClickComment(val) {
      // 本地存储数据
      this.localStorageSet(val);

      const { id } = val;
      // 传递歌曲id给父组件
      this.$emit("event", { id });
      // 跳转到评论
      this.$router.replace(`/comment/${id}`);
    },
    // 本地存储
    localStorageSet(val) {
      const { musicName, artistName, albumID } = val;
      let { singerName } = val;
      // 调用过滤器方法 处理歌手格式
      singerName = this.$options.filters.formatSinger(singerName);

      // 本地存储数据 歌曲名字 歌手名 所属专辑 专辑id
      localStorage.setItem(
        "musicDetails",
        JSON.stringify({
          musicName: musicName,
          singerName: singerName,
          artistName: artistName,
          albumID: albumID
        })
      );
    },
    // goMV
    goMv(mvid) {
      // 传递歌曲id给父组件
      this.$emit("mvevent", mvid);
      this.$router.replace(`/video/${mvid}`);
    }
  },
  mounted() {
    // 滚动条
    this.myScroll = new this.$iscroll(this.$refs.res, {
      mouseWheel: true // 开启鼠标滚轮支持
    });
  },
  updated() {
    // 刷新滚动;
    this.myScroll.refresh();
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

/* 歌曲列表动画 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
