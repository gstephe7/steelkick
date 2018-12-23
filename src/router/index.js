import Vue from 'vue'
import Router from 'vue-router'

//import route components
import Home from '@/components/home/Home'
import SearchPage from '@/components/search/SearchPage'
import Listings from '@/components/listings/Listings'
import MaterialDetails from '@/components/material/MaterialDetails'
import Cart from '@/components/cart/Cart'
import Checkout from '@/components/checkout/Checkout'
import CheckoutConfirmation from '@/components/checkout/CheckoutConfirmation'
import NewListing from '@/components/listings/NewListing'
import MaterialConfirmation from '@/components/material/MaterialConfirmation'
import Dashboard from '@/components/dashboard/Dashboard'
import DashboardHome from '@/components/dashboard/DashboardHome'
import AddMaterial from '@/components/dashboard/AddMaterial'
import Inventory from '@/components/dashboard/Inventory'
import MaterialEdit from '@/components/material/MaterialEdit'
import OrderPage from '@/components/orders/OrderPage'
import OrderDetails from '@/components/orders/OrderDetails'
import Transactions from '@/components/transactions/Transactions'
import TransactionDetails from '@/components/transactions/TransactionDetails'
import SetPrices from '@/components/dashboard/SetPrices'
import ManageUsers from '@/components/dashboard/users/ManageUsers'
import UserEdit from '@/components/dashboard/users/UserEdit'
import NewUser from '@/components/dashboard/users/NewUser'
import NewUserConfirmation from '@/components/dashboard/users/NewUserConfirmation'

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
      component: MaterialDetails
    },
    {
      path: '/material',
      name: 'MaterialDetails',
      component: MaterialDetails
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
      path: '/material-confirmation',
      name: 'MaterialConfirmation',
      component: MaterialConfirmation
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
        },
        {
          path: 'edit-material',
          name: 'MaterialEdit',
          component: MaterialEdit
        },
        {
          path: 'pending-orders',
          name: 'OrderPage',
          component: OrderPage
        },
        {
          path: 'order-details',
          name: 'OrderDetails',
          component: OrderDetails
        },
        {
          path: 'transactions',
          name: 'Transactions',
          component: Transactions
        },
        {
          path: 'transaction-details',
          name: 'TransactionDetails',
          component: TransactionDetails
        },
        {
          path: 'set-prices',
          name: 'SetPrices',
          component: SetPrices
        },
        {
          path: 'manage-users',
          name: 'ManageUsers',
          component: ManageUsers
        },
        {
          path: 'edit-user',
          name: 'EditUser',
          component: UserEdit
        },
        {
          path: 'new-user',
          name: 'NewUser',
          component: NewUser
        },
        {
          path: 'new-user-confirmed',
          name: 'NewUserConfirmation',
          component: NewUserConfirmation
        }
      ]
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router
