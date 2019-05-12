import Vue from 'vue'
import App from './App.vue'

// import libraries
import VueCookies from 'vue-cookies'
import VueAnalytics from 'vue-analytics'
import VueGtm from 'vue-gtm'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

// import global components
import Back from '@/components/app/nav/Back.vue'

// import icons
import {
  faBars,
  faTimes,
  faEdit,
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
  faCheckCircle,
  faAngleUp,
  faAngleDown,
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
  faUserEdit
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
  faEdit,
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
  faCheckCircle,
  faAngleUp,
  faAngleDown,
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
  faUserEdit
})

// register components
Vue.component('Back', Back)
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
