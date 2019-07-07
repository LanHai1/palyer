import Vue from "vue";
import App from "./App.vue";

// 导入路由
import VueRouter from "vue-router";

// 模块化机制编程
Vue.use(VueRouter);

// 组件
import musicSearch from "./components/musicSearch.vue";

//  定义路由
const routes = [
  // 搜索结果
  {
    path: "/musicSearch",
    component: musicSearch
  }
];

// 创建路由
const router = new VueRouter({
  routes
});

Vue.config.productionTip = false;

new Vue({
  // 挂载路由
  router,
  render: h => h(App)
}).$mount("#app");
