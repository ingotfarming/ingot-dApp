import Vue from 'vue'
import VueLogger from 'vuejs-logger';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

// Import App after Bootstrap to override css
import App from './App.vue'
import router from './router'

import Swal from 'sweetalert2'

import ContractsServices from '@/services/ContractsServices.js'

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
