import Vue from 'vue'
import Router from 'vue-router'
import Blank from '@/components/Blank'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Blank',
      component: Blank
    }
  ]
})
