import Vue from 'vue'
import Router from 'vue-router'

// import modules
import appRoutes from './appRoutes.js'
import websiteRoutes from './websiteRoutes.js'
import adminRoutes from './adminRoutes.js'

// import base routes
import Admin from '@/components/admin/Admin'
import App from '@/components/app/App'
import Website from '@/components/website/App'

// misc routes
import NotFound from '@/components/notFound/NotFound'

Vue.use(Router)

const router = new Router({
  routes: [

    // 404 page route
    {
      path: '*',
      component: NotFound
    },

    // app routes
    {
      path: '/',
      component: App,
      meta: {
        requiresAuth: true
      },
      children: appRoutes
    },

    // landing page and marketing
    {
      path: '/welcome',
      component: Website,
      children: websiteRoutes
    },

    // admin
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        requiresAdmin: true
      },
      children: adminRoutes
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = $cookies.get('sk-user')
    if (token) {
      next()
    } else {
      next({
        path: '/welcome'
      })
    }
  } else if (to.matched.some(record => record.meta.requiresAdmin)) {
    const adminToken = $cookies.get('adminToken')
    if (adminToken) {
      next()
    } else {
      next({
        path: '/admin-login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

export default router
