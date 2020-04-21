/*
 * @Description:
 * @Autor: Sia
 * @Date: 2019-07-20 10:19:32
 * @LastEditors: Sia
 * @LastEditTime: 2020-01-19 10:25:34
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import BMap from "vue-baidu-map";
import store from "./store/index";
import axios from "./common/http";
import "element-ui/lib/theme-chalk/index.css";
import sider from "./components/common/sider.vue";
import Headers from "./components/common/header.vue";
import HighCharts from "highcharts";
Vue.use(ElementUI);
Vue.use(BMap, {
  ak: "mj5Ztq2ugALxuBChiUgs6H0V7Cu0hfHU"
});
Vue.component("sider", sider);
Vue.component("headers", Headers);
Vue.use(HighCharts);
Vue.prototype.axios = axios;
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
  // watch:{
  //   $route(to,from){
  //     console.log(to);
  //   }
  // }
});
