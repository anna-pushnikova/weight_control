import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/bmi',
    name: 'BMI',
    component: () => import('../views/Bmi.vue'),
    meta: {
      layout: 'main'
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
    name: 'Pssword',
    component: () => import(/* webpackChunkName: "about" */ '../views/Password.vue'),
    meta: {
      layout: 'empty'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
