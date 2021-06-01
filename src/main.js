import Vue from 'vue'
import VueLogger from 'vuejs-logger';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret,faCoins } from '@fortawesome/free-solid-svg-icons'
import { faBtc, faTwitter } from '@fortawesome/free-brands-svg-icons'
import {  } from '@fortawesome/free-regular-svg-icons'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Import App after Bootstrap to override css
import App from './App.vue'
import router from './router'

import Swal from 'sweetalert2'

import ContractsServices from '@/services/ContractsServices.js'

library.add(faUserSecret,faBtc,faCoins, faTwitter)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false


// Logger configuration
const isProduction = process.env.NODE_ENV === 'production';
const options = {
    isEnabled: true,
    logLevel : isProduction ? 'error' : 'debug',
    stringifyArguments : false,
    showLogLevel : true,
    showMethodName : true,
    separator: '|',
    showConsoleColors: true
};
Vue.use(VueLogger, options);
Vue.prototype.$Swal =  Swal;

// configure EventBus
const EventBus = new Vue();
export default EventBus;

// api services
Vue.prototype.$contractService =  new ContractsServices();
Vue.prototype.$contractServicePromise = Vue.prototype.$contractService.loadWeb3(false, false);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
