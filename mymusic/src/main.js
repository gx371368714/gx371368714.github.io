// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)

import Recommend from './components/views/recommend/index'
import Rank from './components/views/rank/index'
import ListDetail from './components/views/rank/detail'
import Search from './components/views/search/index'
import Playing from './components/playing'
import header from './components/header/header.vue'
/* eslint-disable no-new */
const router = new VueRouter({
  mode:'history',
  base:__dirname,
  routes:[
    {path:'/',component:Recommend},
    {path:'/header',component:header},
    {path:'/recommend',component:Recommend},
    {path:'/rank',component:Rank},
    {path:'/search',name:'Search',component:Search},
    {path:'/ListDetail/:id',name:'ListDetail',component:ListDetail},
    {path:'/playing/:songid',name:'Playing',component:Playing}
  ]
})
new Vue({
 router:router,
  render:h=>h(App)
}).$mount('#app')
