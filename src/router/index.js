import Vue from 'vue'
import Router from 'vue-router'

// WEBSITE ROUTES
import Website from '@/components/website/App'
import Home from '@/components/website/home/Home'
import Login from '@/components/website/login/Login'
import LogoutConfirmation from '@/components/website/logout/LogoutConfirmation'
import PasswordRecovery from '@/components/website/login/PasswordRecovery'
import CreateAccountPage from '@/components/website/createAccount/CreateAccountPage'
import PasswordRecoveryConfirmation from '@/components/website/login/PasswordRecoveryConfirmation'
import PasswordReset from '@/components/website/login/PasswordReset'
import Contact from '@/components/website/contact/Contact'
import ContactConfirmation from '@/components/website/contact/ContactConfirmation'

// APP ROUTES
import App from '@/components/app/App'
import Dashboard from '@/components/app/dashboard/Dashboard'
import Working from '@/components/app/working/Working'

// jobs
import Jobs from '@/components/app/jobs/Jobs'
import CreateJob from '@/components/app/jobs/CreateJob'
import JobDetails from '@/components/app/jobs/JobDetails'

// parts
import CreatePart from '@/components/app/parts/CreatePart'
import PartsPage from '@/components/app/parts/PartsPage'
import PartConfirmation from '@/components/app/parts/PartConfirmation'
import PartDetails from '@/components/app/parts/PartDetails'

// purchasing
import Purchasing from '@/components/app/purchasing/Purchasing'

// schedule
import Schedule from '@/components/app/schedule/Schedule'

// Tasks
import Tasks from '@/components/app/tasks/Tasks'

// users
import Users from '@/components/app/users/Users'
import ManageUsers from '@/components/app/users/ManageUsers'
import UserEdit from '@/components/app/users/UserEdit'
import NewUser from '@/components/app/users/NewUser'
import NewUserConfirmation from '@/components/app/users/NewUserConfirmation'

// inventory
import AddMaterial from '@/components/app/inventory/AddMaterial'
import Inventory from '@/components/app/inventory/Inventory'
import MaterialEdit from '@/components/app/inventory/MaterialEdit'
import MaterialConfirmation from '@/components/app/inventory/MaterialConfirmation'

// marketplace routes
import Marketplace from '@/components/app/marketplace/Marketplace'
import Company from '@/components/app/marketplace/company/Company'
import AdvancedSearch from '@/components/app/search/AdvancedSearch'
import Listings from '@/components/app/marketplace/listings/Listings'
import Cart from '@/components/app/marketplace/cart/Cart'
import Checkout from '@/components/app/marketplace/checkout/Checkout'
import CheckoutConfirmation from '@/components/app/marketplace/checkout/CheckoutConfirmation'
import OrderPage from '@/components/app/marketplace/orders/OrderPage'
import OrderDetails from '@/components/app/marketplace/orders/OrderDetails'
import Transactions from '@/components/app/marketplace/transactions/Transactions'
import TransactionDetails from '@/components/app/marketplace/transactions/TransactionDetails'
import SetPrices from '@/components/app/marketplace/SetPrices'
import EditProfile from '@/components/app/marketplace/editProfile/EditProfile'
import MaterialDetails from '@/components/app/material/MaterialDetails'

// company settings
import Settings from '@/components/app/settings/Settings'
import Workflow from '@/components/app/settings/workflow/Workflow'
import WorkflowConfirmation from '@/components/app/settings/workflow/WorkflowConfirmation'

// admin routes
import Admin from '@/components/admin/Admin'
import AdminLogin from '@/components/admin/AdminLogin'
import AdminHome from '@/components/admin/AdminHome'
import CompanyEdit from '@/components/admin/components/companies/CompanyEdit'

// misc routes
import Logo from '@/components/logo/LogoImg'
import NotFound from '@/components/notFound/NotFound'

Vue.use(Router)

const router = new Router({
  routes: [

    // 404 page route
    {
      path: '*',
      component: NotFound
    },

    // app
    {
      path: '/',
      component: App,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'jobs',
          name: 'Jobs',
          component: Jobs
        },
        {
          path: 'create-job',
          name: 'CreateJob',
          component: CreateJob
        },
        {
          path: 'job-details',
          name: 'JobDetails',
          component: JobDetails
        },
        {
          path: 'create-part',
          name: 'CreatePart',
          component: CreatePart
        },
        {
          path: 'part-confirmation',
          name: 'PartConfirmation',
          component: PartConfirmation
        },
        {
          path: 'parts',
          name: 'Parts',
          component: PartsPage
        },
        {
          path: 'part-details',
          name: 'PartDetails',
          component: PartDetails
        },
        {
          path: 'purchasing',
          name: 'Purchasing',
          component: Purchasing
        },
        {
          path: 'schedule',
          name: 'Schedule',
          component: Schedule
        },
        {
          path: 'tasks',
          name: 'Tasks',
          component: Tasks
        },
        {
          path: 'working',
          name: 'Working',
          component: Working
        },
        {
          path: 'users',
          name: 'Users',
          component: Users
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
          path: 'marketplace',
          name: 'Marketplace',
          component: Marketplace
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
        {
          path: 'settings',
          name: 'Settings',
          component: Settings
        },
        {
          path: 'workflow',
          name: 'Workflow',
          component: Workflow
        },
        {
          path: 'workflow-confirmation',
          name: 'WorkflowConfirmation',
          component: WorkflowConfirmation
        }
      ]
    },

    // landing page and marketing
    {
      path: '/welcome',
      component: Website,
      children: [
        {
          path: '',
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
          path: '/create-account',
          name: 'CreateAccount',
          component: CreateAccountPage
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
        }
      ]
    },

    // admin
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
          path: 'logo',
          name: 'Logo',
          component: Logo
        },
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
