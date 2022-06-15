import Vue from 'vue'
import VueRouter from 'vue-router'
import MainBoardPage from '../views/curzr-mainboard.vue'
import Error404Page from '../views/error-404.vue'
import AboutPage from '../views/about-page.vue'
import CodeOfConduct from '../views/code-of-conduct.vue'
import PrivacyPolicy from '../views/privacy-policy.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainBoardPage,
    alias: '/home'
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage
  },
  {
    path: '/code-of-conduct',
    name: 'code-of-conduct',
    component: CodeOfConduct
  },
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    component: PrivacyPolicy
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
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router
