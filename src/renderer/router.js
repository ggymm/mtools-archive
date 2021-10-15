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
    path: '/develop',
    name: 'Develop',
    component: () => import('@/views/develop/index.vue')
  },
  {
    path: '/redis',
    name: 'RedisCli',
    component: () => import('@/views/redis/index.vue')
  },
  {
    path: '/download',
    name: 'Download',
    component: () => import('@/views/download/index.vue')
  },
  {
    path: '/magnet',
    name: 'Magnet',
    component: () => import('@/views/magnet/index.vue')
  },
  {
    path: '/emoji',
    name: 'Emoji',
    component: () => import('@/views/emoji/index.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
