import Vue from 'vue'
import Router from 'vue-router'
import App from '../../App.vue'
import store from '../../store'
import Cal from '../../calculator/Calculator.vue'
import CalSettings from '../../calculator/CalSettings.vue'

Vue.use(Router)

const ismp = typeof Page === 'function' && typeof Component === 'function'
localStorage.setItem('ismp', ismp, '365d')

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/(home|index)?',
    name: 'Home',
    component: Cal,
  }, {
    path: '/settings',
    name: 'Settings',
    component: CalSettings,
  }],
})

export default function createApp() {
  const container = document.createElement('div')
  container.id = 'app'
  document.body.appendChild(container)

  Vue.config.productionTip = false

  return new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
}
