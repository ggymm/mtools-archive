import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views'

Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    name: 'Index',
    component: Index
  },
  {
    path: '/coder',
    name: 'Coder',
    component: () => import('@/views/coder/index.vue')
  },
  {
    path: '/json',
    name: 'Json',
    component: () => import('@/views/json/index.vue')
  },
  {
    path: '/postman',
    name: 'Postman',
    component: () => import('@/views/postman/index.vue')
  },
  {
    path: '/redis',
    name: 'RedisCli',
    component: () => import('@/views/redis/index.vue')
  },
  {
    path: '/android',
    name: 'Android',
    component: () => import('@/views/android/index.vue')
  },
  {
    path: '/magnet',
    name: 'Magnet',
    component: () => import('@/views/magnet/index.vue')
  },
  {
    path: '/video',
    name: 'Video',
    component: () => import('@/views/video/index.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
