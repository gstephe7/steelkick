import Home from '@/pages/website/home/Home'
import Login from '@/pages/website/login/Login'
import LogoutConfirmation from '@/pages/website/logout/LogoutConfirmation'
import PasswordRecovery from '@/pages/website/login/PasswordRecovery'
import CreateAccountPage from '@/pages/website/createAccount/CreateAccountPage'
import PasswordRecoveryConfirmation from '@/pages/website/login/PasswordRecoveryConfirmation'
import PasswordReset from '@/pages/website/login/PasswordReset'
import Contact from '@/pages/website/contact/Contact'
import ContactConfirmation from '@/pages/website/contact/ContactConfirmation'

// marketplace routes
import AdvancedSearch from '@/pages/app/search/AdvancedSearch'
import Company from '@/pages/app/marketplace/company/Company'
import Listings from '@/pages/app/marketplace/listings/Listings'

// admin login
import AdminLogin from '@/pages/admin/AdminLogin'

export default [
  {
    path: '',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (from.path == '/') {
        const token = $cookies.get('sk-user')
        if (token) {
          next({ path: '/dashboard' })
        } else {
          next()
        }
      } else {
        next()
      }
    }
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
