// APP ROUTES
import Dashboard from '@/pages/app/dashboard/Dashboard'
import Working from '@/pages/app/working/Working'

// jobs
import Jobs from '@/pages/app/jobs/Jobs'
import JobPage from '@/pages/app/jobs/JobPage'

// parts
import CreatePart from '@/pages/app/parts/CreatePart'
import PartsPage from '@/pages/app/parts/PartsPage'
import PartDetails from '@/pages/app/parts/PartDetails'

// purchasing
import Purchasing from '@/pages/app/purchasing/Purchasing'

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
      parent: {
        path: '/dashboard',
        name: 'Dashboard'
      }
    }
  },
  {
    path: '/job-details',
    name: 'Job',
    component: JobPage,
    meta: {
      job: true,
      parent: {
        path: '/jobs',
        name: 'All Jobs'
      }
    }
  },
  {
    path: '/create-part',
    name: 'Create New Part',
    component: CreatePart,
    meta: {
      job: true,
      parent: {
        path: '/parts',
        name: 'Parts'
      }
    }
  },
  {
    path: '/parts',
    name: 'Parts',
    component: PartsPage,
    meta: {
      job: true,
      parent: {
        path: '/job-details',
        name: 'Job Details'
      }
    }
  },
  {
    path: '/part-details',
    name: 'Part Details',
    component: PartDetails,
    meta: {
      job: true,
      parent: {
        path: '/parts',
        name: 'Parts'
      }
    }
  },
  {
    path: '/purchasing',
    name: 'Purchasing',
    component: Purchasing,
    meta: {
      parent: {
        path: '/dashboard',
        name: 'Dashboard'
      }
    }
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule,
    meta: {
      parent: {
        path: '/dashboard',
        name: 'Dashboard'
      }
    }
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks,
    meta: {
      parent: {
        path: '/dashboard',
        name: 'Dashboard'
      }
    }
  },
  {
    path: '/working',
    name: 'Working',
    component: Working,
    meta: {
      parent: {
        path: '/dashboard',
        name: 'Dashboard'
      }
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: {
      parent: {
        path: '/dashboard',
        name: 'Dashboard'
      }
    }
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: Inventory,
    meta: {
      parent: {
        path: '/dashboard',
        name: 'Dashboard'
      }
    }
  },
  {
    path: '/marketplace',
    name: 'Marketplace',
    component: Marketplace,
    meta: {
      parent: {
        path: '/dashboard',
        name: 'Dashboard'
      }
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
      parent: {
        path: '/dashboard',
        name: 'Dashboard'
      }
    }
  }
]
