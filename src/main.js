import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuelidate from 'vuelidate'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Toasted from 'vue-toasted';

import dateFilter from '@/filter/date.filter.js'
import weightFilter from '@/filter/changeWeight.filter.js'
import datetimeFilter from '@/filter/datetime.filter.js'
import dayFilter from '@/filter/day.filter.js'

library.add(faUserSecret)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(vuelidate)
Vue.use(Toasted, {
  iconPack : 'fontawesome',
  position: 'bottom-right',
  duration: 2500,
  keepOnHover: true,
  theme: 'bubble',
  singleton: true
})

Vue.filter('datefilter', dateFilter)
Vue.filter('weightfilter', weightFilter)
Vue.filter('datetimefilter', datetimeFilter)
Vue.filter('dayfilter', dayFilter)

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
});

let app; 

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
