import Vue from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'
import VueAnalytics from 'vue-analytics'
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
  faSpinner
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

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
  faSpinner
})

Vue.component('fa-icon', FontAwesomeIcon)

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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
