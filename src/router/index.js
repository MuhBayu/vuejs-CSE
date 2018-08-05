import Vue from 'vue'
import Router from 'vue-router'
import HomeSearch from '@/components/HomeSearch'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'App',
      component: HomeSearch
    }
  ]
})
