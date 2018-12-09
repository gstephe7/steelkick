import Vue from 'vue'
import Router from 'vue-router'

//import route components
import Home from '@/components/home/Home'
import AdvancedSearch from '@/components/search/AdvancedSearch'
import Listings from '@/components/listings/Listings'
import ListingPage from '@/components/listings/ListingPage'

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
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router
