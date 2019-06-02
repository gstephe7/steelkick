// admin routes
import AdminHome from '@/pages/admin/AdminHome'
import CompanyAdmin from '@/pages/admin/components/companies/Company'

export default [
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
