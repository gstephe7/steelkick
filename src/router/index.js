import Vue from 'vue'
import Router from 'vue-router'

//import route components
import Home from '@/components/home/Home'
import SearchPage from '@/components/search/SearchPage'
import Listings from '@/components/listings/Listings'
import ListingPage from '@/components/listings/ListingPage'
import Cart from '@/components/cart/Cart'
import Checkout from '@/components/checkout/Checkout'
import CheckoutConfirmation from '@/components/checkout/CheckoutConfirmation'
import NewListing from '@/components/material/NewListing'
import NewMaterialConfirmation from '@/components/material/NewMaterialConfirmation'
import Dashboard from '@/components/dashboard/Dashboard'
import DashboardHome from '@/components/dashboard/DashboardHome'
import AddMaterial from '@/components/dashboard/AddMaterial'
import Inventory from '@/components/dashboard/Inventory'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/search',
      name: 'Search',
      component: SearchPage
    },
    {
      path: '/listings',
      name: 'Listings',
      component: Listings
    },
    {
      path: '/listing',
      name: 'Listing',
      component: ListingPage
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout
    },
    {
      path: '/checkout-confirmation',
      name: 'CheckoutConfirmation',
      component: CheckoutConfirmation
    },
    {
      path: '/new-listing',
      name: 'NewListing',
      component: NewListing
    },
    {
      path: '/new-material-confirmation',
      name: 'NewMaterialConfirmation',
      component: NewMaterialConfirmation
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'home',
          name: 'DashboardHome',
          component: DashboardHome
        },
        {
          path: 'add-material',
          name: 'AddMaterial',
          component: AddMaterial
        },
        {
          path: 'inventory',
          name: 'Inventory',
          component: Inventory
        }
      ]
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router
