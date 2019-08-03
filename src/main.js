// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import BMap from 'vue-baidu-map'
import Vuex from 'vuex'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(BMap,{
  ak:'mj5Ztq2ugALxuBChiUgs6H0V7Cu0hfHU'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
