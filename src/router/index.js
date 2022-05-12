import Vue from 'vue'
import VueRouter from 'vue-router'
import mainboard from '../views/curzr-mainboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: mainboard
  }
]

const router = new VueRouter({
  routes
})

export default router
