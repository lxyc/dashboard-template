import Vue from 'vue'
import App from './App.vue'
import Toasted from 'vue-toasted'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(Toasted, { position: 'top-center', duration: 3000 })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
