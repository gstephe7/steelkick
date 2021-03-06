import Vue from 'vue'
import App from './App.vue'

// import libraries
import VueCookies from 'vue-cookies'
import VueAnalytics from 'vue-analytics'
import VueGtm from 'vue-gtm'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

// import global components
import Banner from '@/components/dialogs/Banner'
import Button from '@/components/forms/Button'
import ButtonFab from '@/components/forms/ButtonFab'
import DashboardCard from '@/components/cards/DashboardCard'
import Card from '@/components/cards/Card'
import ChipProgress from '@/components/chips/ChipProgress'
import Chip from '@/components/chips/Chip'
import Form from '@/components/forms/Form'
import InputCheckBox from '@/components/forms/InputCheckBox'
import InputCurrency from '@/components/forms/InputCurrency'
import InputFile from '@/components/forms/InputFile'
import InputLength from '@/components/forms/InputLength'
import InputNumber from '@/components/forms/InputNumber'
import InputSearch from '@/components/forms/InputSearch'
import InputSelect from '@/components/forms/InputSelect'
import InputText from '@/components/forms/InputText'
import InputTextArea from '@/components/forms/InputTextArea'
import Item from '@/components/lists/Item'
import List from '@/components/lists/List'
import Menu from '@/components/menu/Menu'
import MenuItem from '@/components/menu/MenuItem'
import Modal from '@/components/dialogs/Modal'
import Screen from '@/components/dialogs/Screen'
import SearchHeader from '@/components/forms/SearchHeader'
import SnackBar from '@/components/dialogs/SnackBar'
import Tabs from '@/components/navigation/Tabs'
import VisualLine from '@/components/visuals/VisualLine'

// import icons
import {
  faBars,
  faTimes,
  faTimesCircle,
  faEdit,
  faEllipsisH,
  faEllipsisV,
  faFileImport,
  faTrashAlt,
  faDollarSign,
  faShippingFast,
  faPlusCircle,
  faList,
  faShoppingCart,
  faClock,
  faHistory,
  faChartLine,
  faUsers,
  faCog,
  faCheck,
  faCheckCircle,
  faAngleUp,
  faAngleDown,
  faAngleRight,
  faAngleLeft,
  faSpinner,
  faEnvelope,
  faSitemap,
  faCreditCard,
  faTh,
  faBoxes,
  faTasks,
  faSearch,
  faCubes,
  faProjectDiagram,
  faHammer,
  faBriefcase,
  faUserEdit,
  faArrowUp,
  faArrowDown,
  faArrowLeft,
  faEye,
  faEyeSlash,
  faFilter,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'

import {
  faCalendarAlt
} from '@fortawesome/free-regular-svg-icons'

import {
  faFacebook,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons'

library.add({
  faBars,
  faTimes,
  faTimesCircle,
  faEdit,
  faEllipsisH,
  faEllipsisV,
  faFileImport,
  faTrashAlt,
  faDollarSign,
  faShippingFast,
  faPlusCircle,
  faList,
  faShoppingCart,
  faClock,
  faHistory,
  faChartLine,
  faUsers,
  faCog,
  faCheck,
  faCheckCircle,
  faAngleUp,
  faAngleDown,
  faAngleRight,
  faAngleLeft,
  faSpinner,
  faEnvelope,
  faFacebook,
  faLinkedin,
  faSitemap,
  faCreditCard,
  faCalendarAlt,
  faTh,
  faTasks,
  faBoxes,
  faSearch,
  faCubes,
  faProjectDiagram,
  faHammer,
  faBriefcase,
  faUserEdit,
  faArrowUp,
  faArrowDown,
  faArrowLeft,
  faEye,
  faEyeSlash,
  faFilter,
  faSignOutAlt
})

// register components
Vue.component('Banner', Banner)
Vue.component('Button', Button)
Vue.component('ButtonFab', ButtonFab)
Vue.component('Card', Card)
Vue.component('Chip', Chip)
Vue.component('ChipProgress', ChipProgress)
Vue.component('DashboardCard', DashboardCard)
Vue.component('Form', Form)
Vue.component('InputCheckBox', InputCheckBox)
Vue.component('InputCurrency', InputCurrency)
Vue.component('InputFile', InputFile)
Vue.component('InputLength', InputLength)
Vue.component('InputNumber', InputNumber)
Vue.component('InputSearch', InputSearch)
Vue.component('InputSelect', InputSelect)
Vue.component('InputText', InputText)
Vue.component('InputTextArea', InputTextArea)
Vue.component('Item', Item)
Vue.component('List', List)
Vue.component('Menu', Menu)
Vue.component('MenuItem', MenuItem)
Vue.component('Modal', Modal)
Vue.component('Screen', Screen)
Vue.component('SearchHeader', SearchHeader)
Vue.component('SnackBar', SnackBar)
Vue.component('Tabs', Tabs)
Vue.component('VisualLine', VisualLine)
Vue.component('icon', FontAwesomeIcon)

// Vue cookies
Vue.use(VueCookies)

//vue-router
import router from './router'

// vuex store
import store from './store'

// Vue Analytics (Google Analytics)
Vue.use(VueAnalytics, {
  id: 'UA-99774746-4',
  router
})

// Google Tag Manager
Vue.use(VueGtm, {
  id: 'GTM-MFBLMZ3',
  vueRouter: router
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
