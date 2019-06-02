// APP ROUTES
import Dashboard from '@/pages/app/dashboard/Dashboard'
import Working from '@/pages/app/working/Working'

// jobs
import Jobs from '@/pages/app/jobs/Jobs'
import CreateJob from '@/pages/app/jobs/CreateJob'
import JobDetails from '@/pages/app/jobs/JobDetails'

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
import UserDetails from '@/pages/app/users/UserDetails'
import UserEdit from '@/pages/app/users/UserEdit'
import NewUser from '@/pages/app/users/NewUser'
import NewUserConfirmation from '@/pages/app/users/NewUserConfirmation'

// inventory
import AddMaterial from '@/pages/app/material/AddMaterial'
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
import Workflow from '@/pages/app/settings/workflow/Workflow'
import EditProfile from '@/pages/app/settings/profile/EditProfile'



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
    path: '/create-job',
    name: 'Create New Job',
    component: CreateJob,
    meta: {
      parent: {
        path: '/jobs',
        name: 'All Jobs'
      }
    }
  },
  {
    path: '/job-details',
    name: 'Job Details',
    component: JobDetails,
    meta: {
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
    path: '/user-details',
    name: 'User Details',
    component: UserDetails,
    meta: {
      parent: {
        path: '/users',
        name: 'Users'
      }
    }
  },
  {
    path: '/add-material',
    name: 'Add Material',
    component: AddMaterial,
    meta: {
      parent: {
        path: '/inventory',
        name: 'Inventory'
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
    path: '/edit-user',
    name: 'Edit User',
    component: UserEdit
  },
  {
    path: '/new-user',
    name: 'Add New User',
    component: NewUser
  },
  {
    path: '/new-user-confirmed',
    name: 'New User Confirmation',
    component: NewUserConfirmation
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
  },
  {
    path: '/workflow',
    name: 'Configure Workflow',
    component: Workflow,
    meta: {
      parent: {
        path: '/settings',
        name: 'Settings'
      }
    }
  },
  {
    path: '/edit-profile',
    name: 'Edit Profile',
    component: EditProfile,
    meta: {
      parent: {
        path: '/settings',
        name: 'Settings'
      }
    }
  }
]
