import Vue from 'vue'
import Router from 'vue-router'

// const Home = () => import(/* webpackChunkName: "Home" */'@/home/Index.vue')
// const List = () => import(/* webpackChunkName: "List" */'@/list/Index.vue')
// const Detail = () => import(/* webpackChunkName: "Detail" */'@/detail/Index.vue')
const Cal = () => import(/* webpackChunkName: "Home" */'@/calculator/Calculator.vue')
const CalSettings = () => import(/* webpackChunkName: "Home" */'@/calculator/CalSettings.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/(home|index)?',
    name: 'Home',
    component: Cal,
  }, {
    path: '/settings',
    name: 'settings',
    component: CalSettings,
  // }, {
  //   path: '/index.html',
  //   name: 'HomeHtml',
  //   component: Home,
  // }, {
  //   path: '/test/(home|index)',
  //   name: 'HomeTest',
  //   component: Home,
  // }, {
  //   path: '/test/list/:id',
  //   name: 'List',
  //   component: List,
  // }, {
  //   path: '/test/detail/:id',
  //   name: 'Detail',
  //   component: Detail,
  }],
})
