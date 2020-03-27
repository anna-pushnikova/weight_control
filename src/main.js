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


firebase.initializeApp({
  apiKey: "AIzaSyDK0u2YWFePDSmpU4HTrZGNf_sD4ClKcHg",
  authDomain: "weight-control-2cafe.firebaseapp.com",
  databaseURL: "https://weight-control-2cafe.firebaseio.com",
  projectId: "weight-control-2cafe",
  storageBucket: "weight-control-2cafe.appspot.com",
  messagingSenderId: "89404611221",
  appId: "1:89404611221:web:3894c9d463236d5a23599c",
  measurementId: "G-FYHP35M7RJ"
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
