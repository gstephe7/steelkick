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
import EditProfile from '@/components/dashboard/editProfile/EditProfile'
import Login from '@/components/login/Login'
import LogoutConfirmation from '@/components/logout/LogoutConfirmation'
import PasswordRecovery from '@/components/login/PasswordRecovery'
import Register from '@/components/register/Register'
import PasswordRecoveryConfirmation from '@/components/login/PasswordRecoveryConfirmation'
import PasswordReset from '@/components/login/PasswordReset'
import Company from '@/components/company/Company'
import Logo from '@/components/logo/LogoImg'
import NotFound from '@/components/notFound/NotFound'
import Contact from '@/components/contact/Contact'
import ContactConfirmation from '@/components/contact/ContactConfirmation'

// import admin routes
import Admin from '@/components/admin/Admin'
import AdminLogin from '@/components/admin/AdminLogin'
import AdminHome from '@/components/admin/AdminHome'
import CompanyEdit from '@/components/admin/components/companies/CompanyEdit'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      component: NotFound
    },
    {
      path: '/logo',
      name: 'Logo',
      component: Logo
    },
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
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: LogoutConfirmation
    },
    {
      path: '/password-recovery',
      name: 'PasswordRecovery',
      component: PasswordRecovery
    },
    {
      path: '/password-recovery-confirmation',
      name: 'PasswordRecoveryConfirmation',
      component: PasswordRecoveryConfirmation
    },
    {
      path: '/reset-password',
      name: 'PasswordReset',
      component: PasswordReset
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/company',
      name: 'Company',
      component: Company
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/contact-confirmation',
      name: 'ContactConfirmation',
      component: ContactConfirmation
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      },
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
          path: 'material-confirmation',
          name: 'MaterialConfirmation',
          component: MaterialConfirmation
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
        },
        {
          path: 'edit-profile',
          name: 'EditProfile',
          component: EditProfile
        },
        {
          path: 'cart',
          name: 'Cart',
          component: Cart
        },
        {
          path: 'checkout',
          name: 'Checkout',
          component: Checkout
        },
        {
          path: 'checkout-confirmation',
          name: 'CheckoutConfirmation',
          component: CheckoutConfirmation
        },
      ]
    },
    {
      path: '/admin-login',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        requiresAdmin: true
      },
      children: [
        {
          path: 'home',
          name: 'AdminHome',
          component: AdminHome
        },
        {
          path: 'company-edit',
          name: 'CompanyEdit',
          component: CompanyEdit
        }
      ]
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = $cookies.get('token')
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
