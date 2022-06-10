import Vue from 'vue'
import VueRouter from 'vue-router'
import MainBoardPage from '../views/curzr-mainboard.vue'
import Error404Page from '../views/error-404.vue'
import AboutPage from '../views/about-page.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainBoardPage
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage
  },
  {
    path: '/404',
    name: '404',
    component: Error404Page,
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
