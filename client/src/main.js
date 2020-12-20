import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/style.less'

import Vue from 'vue'

/**
 * Import plugins
 */
import VueNotification from 'vue-notification'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import { makeServer } from "./server"

import router from './router'
import store from './store'
import 'bootstrap'

Vue.config.productionTip = false

import App from './App.vue'

/**
 * Layouts components
 */
import LayoutDefault from './layouts/Default.vue'
import LayoutAuth from './layouts/Auth.vue'
import LayoutAdmin from './layouts/Admin.vue'
Vue.component('default-layout', LayoutDefault)
Vue.component('auth-layout', LayoutAuth)
Vue.component('admin-layout', LayoutAdmin)

/**
 * Use plugins in VueJS
 */
Vue.use(VueAxios, axios)
Vue.use(VueNotification)

// if (process.env.NODE_ENV === "development") makeServer()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
