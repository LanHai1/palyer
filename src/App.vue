<template>
  <div id="player">
    <h2 class="title">某云音乐</h2>
    <div class="search">
      <input type="text"/>
      <button >
        <span class="iconfont icon-search"></span>
      </button>
    </div>
    <div class="tab-wrapper">
      <!-- tab栏 -->
      <div class="tab-bar">
        <router-link active-class="active" to="/musicSearch" tag="span" class="bar-item">搜索结果</router-link>
        <a class="bar-item">歌曲播放</a>
        <a class="bar-item">mv</a>
        <a class="bar-item">歌曲评论</a>
      </div>
      <!-- 对应的内容区域 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
@import url("./assets/css/index.css");
@import url("./assets/css/iconfont.css");
</style>
