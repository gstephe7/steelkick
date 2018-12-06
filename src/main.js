import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBars,
  faTimes,
  faDollarSign,
  faExchangeAlt,
  faUser,
  faShippingFast
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add({
  faBars,
  faTimes,
  faDollarSign,
  faExchangeAlt,
  faUser,
  faShippingFast
})

Vue.component('fa-icon', FontAwesomeIcon)

//vue-router
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
