import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import vueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 创建事件总线
Vue.prototype.$bus = new Vue();

// 懒加载
Vue.use(vueLazyLoad);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
