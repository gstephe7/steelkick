// admin routes
import AdminHome from '@/components/admin/AdminHome'
import CompanyAdmin from '@/components/admin/components/companies/Company'
import Logo from '@/components/logo/LogoImg'

export default [
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
    path: 'company-admin',
    name: 'CompanyAdmin',
    component: CompanyAdmin
  }
]
