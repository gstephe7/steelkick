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
import AddMaterial from '@/components/app/inventory/AddMaterial'
import Inventory from '@/components/app/inventory/Inventory'
import MaterialPage from '@/components/app/inventory/MaterialPage'
import MaterialConfirmation from '@/components/app/inventory/MaterialConfirmation'

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
import EditProfile from '@/components/app/marketplace/editProfile/EditProfile'

// company settings
import Settings from '@/components/app/settings/Settings'
import Workflow from '@/components/app/settings/workflow/Workflow'
import WorkflowConfirmation from '@/components/app/settings/workflow/WorkflowConfirmation'



export default [
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
    path: 'user-details',
    name: 'UserDetails',
    component: UserDetails
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
    path: 'material-page',
    name: 'MaterialPage',
    component: MaterialPage
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
