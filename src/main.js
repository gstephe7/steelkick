import Vue from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'
import VueAnalytics from 'vue-analytics'
import VueGtm from 'vue-gtm'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBars,
  faTimes,
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
} from '@fortawesome/free-solid-svg-icons'

import {
  faFacebook,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons'

library.add({
  faBars,
  faTimes,
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
  faLinkedin
})

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
  router,
  store,
  render: h => h(App),
}).$mount('#app')
