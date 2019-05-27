// APP ROUTES
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
import UserDetails from '@/components/app/users/UserDetails'
import UserEdit from '@/components/app/users/UserEdit'
import NewUser from '@/components/app/users/NewUser'
import NewUserConfirmation from '@/components/app/users/NewUserConfirmation'

// inventory
import AddMaterial from '@/components/app/material/AddMaterial'
import Inventory from '@/components/app/material/Inventory'
import MaterialPage from '@/components/app/material/MaterialPage'

// marketplace routes
import Marketplace from '@/components/app/marketplace/Marketplace'
import Cart from '@/components/app/marketplace/cart/Cart'
import Checkout from '@/components/app/marketplace/checkout/Checkout'
import CheckoutConfirmation from '@/components/app/marketplace/checkout/CheckoutConfirmation'
import OrderPage from '@/components/app/marketplace/orders/OrderPage'
import OrderDetails from '@/components/app/marketplace/orders/OrderDetails'
import Transactions from '@/components/app/marketplace/transactions/Transactions'
import TransactionDetails from '@/components/app/marketplace/transactions/TransactionDetails'
import SetPrices from '@/components/app/marketplace/SetPrices'
import EditCompany from '@/components/app/marketplace/editProfile/EditProfile'

// company settings
import Settings from '@/components/app/settings/Settings'
import Workflow from '@/components/app/settings/workflow/Workflow'
import EditProfile from '@/components/app/settings/profile/EditProfile'



export default [
  {
    path: '',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: 'jobs',
    name: 'All Jobs',
    component: Jobs,
    meta: {
      parent: {
        path: '/',
        name: 'Dashboard'
      }
    }
  },
  {
    path: 'create-job',
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
    path: 'job-details',
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
    path: 'create-part',
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
    path: 'part-confirmation',
    name: 'Part Confirmation',
    component: PartConfirmation
  },
  {
    path: 'parts',
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
    path: 'part-details',
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
    path: 'purchasing',
    name: 'Purchasing',
    component: Purchasing,
    meta: {
      parent: {
        path: '/',
        name: 'Dashboard'
      }
    }
  },
  {
    path: 'schedule',
    name: 'Schedule',
    component: Schedule,
    meta: {
      parent: {
        path: '/',
        name: 'Dashboard'
      }
    }
  },
  {
    path: 'tasks',
    name: 'Tasks',
    component: Tasks,
    meta: {
      parent: {
        path: '/',
        name: 'Dashboard'
      }
    }
  },
  {
    path: 'working',
    name: 'Working',
    component: Working,
    meta: {
      parent: {
        path: '/',
        name: 'Dashboard'
      }
    }
  },
  {
    path: 'users',
    name: 'Users',
    component: Users,
    meta: {
      parent: {
        path: '/',
        name: 'Dashboard'
      }
    }
  },
  {
    path: 'user-details',
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
    path: 'add-material',
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
    path: 'inventory',
    name: 'Inventory',
    component: Inventory,
    meta: {
      parent: {
        path: '/',
        name: 'Dashboard'
      }
    }
  },
  {
    path: 'marketplace',
    name: 'Marketplace',
    component: Marketplace,
    meta: {
      parent: {
        path: '/',
        name: 'Dashboard'
      }
    }
  },
  {
    path: 'material-page',
    name: 'Material Page',
    component: MaterialPage,
    meta: {
      parent: {
        path: '/inventory',
        name: 'Inventory'
      }
    }
  },
  {
    path: 'pending-orders',
    name: 'Order Page',
    component: OrderPage
  },
  {
    path: 'order-details',
    name: 'Order Details',
    component: OrderDetails
  },
  {
    path: 'transactions',
    name: 'Transactions',
    component: Transactions
  },
  {
    path: 'transaction-details',
    name: 'Transaction Details',
    component: TransactionDetails
  },
  {
    path: 'set-prices',
    name: 'Set Prices',
    component: SetPrices
  },
  {
    path: 'edit-user',
    name: 'Edit User',
    component: UserEdit
  },
  {
    path: 'new-user',
    name: 'Add New User',
    component: NewUser
  },
  {
    path: 'new-user-confirmed',
    name: 'New User Confirmation',
    component: NewUserConfirmation
  },
  {
    path: 'edit-company',
    name: 'Edit Company',
    component: EditCompany
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
    name: 'Checkout Confirmation',
    component: CheckoutConfirmation
  },
  {
    path: 'settings',
    name: 'Settings',
    component: Settings,
    meta: {
      parent: {
        path: '/',
        name: 'Dashboard'
      }
    }
  },
  {
    path: 'workflow',
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
    path: 'edit-profile',
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
