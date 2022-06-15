import Vue from 'vue'
import VueRouter from 'vue-router'
import MainBoardPage from '../views/curzr-mainboard.vue'

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
    component: () => import('../views/about-page.vue')
  },
  {
    path: '/code-of-conduct',
    name: 'code-of-conduct',
    component: () => import('../views/code-of-conduct.vue')
  },
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    component: () => import('../views/privacy-policy.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/error-404.vue'),
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
