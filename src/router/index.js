import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/book',
    name: 'book',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/trips',
    name: 'trips',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/check-in',
    name: 'check-in',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('../views/AboutView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
