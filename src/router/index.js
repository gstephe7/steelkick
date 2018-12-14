import Vue from 'vue'
import Router from 'vue-router'

//import route components
import Home from '@/components/home/Home'
import AdvancedSearch from '@/components/search/AdvancedSearch'
import Listings from '@/components/listings/Listings'
import ListingPage from '@/components/listings/ListingPage'
import Cart from '@/components/cart/Cart'
import Checkout from '@/components/checkout/Checkout'
import CheckoutConfirmation from '@/components/checkout/CheckoutConfirmation'

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
      component: AdvancedSearch
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
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router
