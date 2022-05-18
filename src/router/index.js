import Vue from 'vue'
import VueRouter from 'vue-router'
import mainboard from '../views/curzr-mainboard.vue'
import error404 from '../views/error-404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: mainboard
  },
  {
    path: '/404',
    name: '404',
    component: error404,
    hidden: true
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const router = new VueRouter({
  routes
})

export default router
