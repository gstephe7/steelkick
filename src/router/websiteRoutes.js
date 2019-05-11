import Home from '@/components/website/home/Home'
import Login from '@/components/website/login/Login'
import LogoutConfirmation from '@/components/website/logout/LogoutConfirmation'
import PasswordRecovery from '@/components/website/login/PasswordRecovery'
import CreateAccountPage from '@/components/website/createAccount/CreateAccountPage'
import PasswordRecoveryConfirmation from '@/components/website/login/PasswordRecoveryConfirmation'
import PasswordReset from '@/components/website/login/PasswordReset'
import Contact from '@/components/website/contact/Contact'
import ContactConfirmation from '@/components/website/contact/ContactConfirmation'

// marketplace routes
import AdvancedSearch from '@/components/app/search/AdvancedSearch'
import Company from '@/components/app/marketplace/company/Company'
import Listings from '@/components/app/marketplace/listings/Listings'
import MaterialDetails from '@/components/app/material/MaterialDetails'

// admin login
import AdminLogin from '@/components/admin/AdminLogin'

export default [
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
  },
  {
    path: '/admin-login',
    name: 'AdminLogin',
    component: AdminLogin
  }
]
