import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
// import VueSweetalert2 from 'vue-sweetalert2'
// import 'sweetalert2/dist/sweetalert2.min.css'
// import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate'

window.axios = require('axios')


Vue.use(Vuex)
// Vue.use(VueSweetalert2)

// Vue.component('ValidationObserver', ValidationObserver)
// Vue.component('ValidationProvider', ValidationProvider)

// extend('required', required)
// extend('email', email)
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

import admin from './modules/admin'



export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      admin,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
