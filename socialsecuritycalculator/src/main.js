import Vue from 'vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import KboneUI from 'kbone-ui'
import 'kbone-ui/lib/weui/weui.css'

Vue.use(KboneUI)
// Vue.use(ElementUI)
Vue.config.productionTip = false

const ismp = typeof Page === 'function' && typeof Component === 'function'
localStorage.setItem('isMP', ismp, '365d')

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
