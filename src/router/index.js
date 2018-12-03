import Vue from 'vue'
import Router from 'vue-router'

//import route components
import Home from '@/components/home/Home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router
