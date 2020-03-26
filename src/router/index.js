import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import('../views/Statistics.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  ,
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/History.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/new_record',
    name: 'New Record',
    component: () => import('../views/NewRecord.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/overall',
    name: 'Overall',
    component: () => import('../views/Overall.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta: {
      layout: 'empty'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
    meta: {
      layout: 'empty'
    }
  },
  {
    path: '/password',
    name: 'Password',
    component: () => import(/* webpackChunkName: "about" */ '../views/Password.vue'),
    meta: {
      layout: 'empty'
    }
  },
  {
    path: '/edit_record',
    name: 'Edit Record',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditRecord.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if(requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router

