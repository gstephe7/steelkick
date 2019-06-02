import Vue from 'vue'
import Router from 'vue-router'

// import modules
import appRoutes from './appRoutes.js'
import websiteRoutes from './websiteRoutes.js'
import adminRoutes from './adminRoutes.js'

// import base routes
import Admin from '@/pages/admin/Admin'
import App from '@/pages/app/App'
import Website from '@/pages/website/App'

// misc routes
import NotFound from '@/pages/notFound/NotFound'

Vue.use(Router)

const router = new Router({
  routes: [

    // 404 page route
    {
      path: '*',
      component: NotFound
    },

    // landing page and marketing
    {
      path: '/',
      component: Website,
      children: websiteRoutes
    },

    // app routes
    {
      path: '/app',
      component: App,
      meta: {
        requiresAuth: true
      },
      children: appRoutes
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
        path: '/login',
        query: {
          redirect: to.fullPath
        }
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
