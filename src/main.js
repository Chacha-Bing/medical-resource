import Vue from 'vue'
import app from './App.vue'
import router from './router'
Vue.config.productionTip = false

new Vue({
  router: router,
  render: h => h(app),
}).$mount('#app')