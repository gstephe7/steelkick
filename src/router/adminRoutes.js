// admin routes
import AdminHome from '@/components/admin/AdminHome'
import CompanyAdmin from '@/components/admin/components/companies/Company'

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
