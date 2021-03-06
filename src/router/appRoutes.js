// APP ROUTES
import Dashboard from '@/pages/app/dashboard/Dashboard'
import WorkingPage from '@/pages/app/working/WorkingPage'

// jobs
import Jobs from '@/pages/app/jobs/Jobs'
import JobPage from '@/pages/app/jobs/JobPage'

// parts
import PartsPage from '@/pages/app/parts/PartsPage'

// nesting
import Nesting from '@/pages/app/nesting/NestingPage'

// schedule
import Schedule from '@/pages/app/schedule/Schedule'

// Tasks
import Tasks from '@/pages/app/tasks/Tasks'

// users
import Users from '@/pages/app/users/Users'

// inventory
import Inventory from '@/pages/app/material/Inventory'

// marketplace routes
import Marketplace from '@/pages/app/marketplace/Marketplace'
import Cart from '@/pages/app/marketplace/cart/Cart'
import Checkout from '@/pages/app/marketplace/checkout/Checkout'
import CheckoutConfirmation from '@/pages/app/marketplace/checkout/CheckoutConfirmation'
import OrderPage from '@/pages/app/marketplace/orders/OrderPage'
import OrderDetails from '@/pages/app/marketplace/orders/OrderDetails'
import Transactions from '@/pages/app/marketplace/transactions/Transactions'
import TransactionDetails from '@/pages/app/marketplace/transactions/TransactionDetails'
import SetPrices from '@/pages/app/marketplace/SetPrices'
import EditCompany from '@/pages/app/marketplace/editProfile/EditProfile'

// company settings
import Settings from '@/pages/app/settings/Settings'

// unauthorized
import Unauthorized from '@/pages/app/unauthorized/Unauthorized'



export default [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/jobs',
    name: 'All Jobs',
    component: Jobs,
    meta: {
      adminOnly: true
    }
  },
  {
    path: '/job-details',
    name: 'Job',
    component: JobPage,
    meta: {
      adminOnly: true,
      job: true
    }
  },
  {
    path: '/parts',
    name: 'Parts',
    component: PartsPage,
    meta: {
      adminOnly: true,
      job: true,
      parent: {
        path: '/job-details',
        name: 'Job Details'
      }
    }
  },
  {
    path: '/nesting',
    name: 'Nesting',
    component: Nesting,
    meta: {
      adminOnly: true,
      job: true,
      parent: {
        path: '/job-details',
        name: 'Job Details'
      }
    }
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule,
    meta: {
    }
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks,
    meta: {
    }
  },
  {
    path: '/working',
    name: 'Working',
    component: WorkingPage,
    meta: {
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: {
      adminOnly: true
    }
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: Inventory,
    meta: {
    }
  },
  {
    path: '/marketplace',
    name: 'Marketplace',
    component: Marketplace,
    meta: {
      adminOnly: true
    }
  },
  {
    path: '/pending-orders',
    name: 'Order Page',
    component: OrderPage
  },
  {
    path: '/order-details',
    name: 'Order Details',
    component: OrderDetails
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: Transactions
  },
  {
    path: '/transaction-details',
    name: 'Transaction Details',
    component: TransactionDetails
  },
  {
    path: '/set-prices',
    name: 'Set Prices',
    component: SetPrices
  },
  {
    path: '/edit-company',
    name: 'Edit Company',
    component: EditCompany
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
    name: 'Checkout Confirmation',
    component: CheckoutConfirmation
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
    }
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: Unauthorized
  }
]
