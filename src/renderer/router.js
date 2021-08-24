import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/renderer/views'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/coder',
    name: 'Coder',
    component: () => import('@/renderer/views/coder/index.vue')
  },
  {
    path: '/json',
    name: 'Json',
    component: () => import('@/renderer/views/json/index.vue')
  },
  {
    path: '/magnet',
    name: 'Magnet',
    component: () => import('@/renderer/views/magnet/index.vue')
  },
  {
    path: '/video',
    name: 'Video',
    component: () => import('@/renderer/views/video/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
