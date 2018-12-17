import Vue from 'vue'
import App from './App.vue'
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
  faEdit,
  faCheckCircle
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
  faEdit,
  faCheckCircle
})

Vue.component('fa-icon', FontAwesomeIcon)

//vue-router
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
