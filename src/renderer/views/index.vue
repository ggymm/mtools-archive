<template>
  <div class="index">
    <div class="top-bar">
      <div class="logo">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-toolkit" />
        </svg>
      </div>
      <div class="title">开发工具箱</div>
      <div class="space" />
      <div class="menus">
        <div v-for="menu in menus" :key="menu['key']" class="menu no-drag" @click="handleMenu(menu['key'])">
          <div class="menu-icon">
            <icon-svg class="icon" :type="menu['icon']" />
          </div>
          <span class="menu-title">{{ menu['title'] }}</span>
        </div>
      </div>
    </div>
    <div class="apps-content no-drag">
      <div id="scroll" class="scroll">
        <div v-for="(value, key) in apps" :key="key" class="app" @click="handleApp(key)">
          <div class="app-icon">
            <icon-svg class="icon" :type="value['icon']" />
          </div>
          <div class="app-title">{{ value['title'] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/iconfont.js'
import { $, on } from '../utils/dom'
import { isExist } from '../utils/fs'
import { requireFunc } from '../utils/require'
import IconSvg from '../components/IconSvg/index'

const { ipcRenderer } = requireFunc('electron')

const menus = [
  { key: 'setting', icon: 'icon-setting', title: '设置' },
  { key: 'minimize', icon: 'icon-minimize', title: '最小化' },
  { key: 'hide', icon: 'icon-hide', title: '隐藏' },
  { key: 'exit', icon: 'icon-exit', title: '退出' }
]
const apps = {
  coder: {
    icon: 'icon-coder',
    title: '代码生成器'
  },
  magnet: {
    icon: 'icon-magnet',
    title: '磁力链接搜索'
  },
  json: {
    icon: 'icon-coder',
    title: 'JSON工具集'
  },
  android: {
    icon: 'icon-android',
    title: 'Android工具集'
  },
  video: {
    icon: 'icon-video',
    title: '音视频工具箱'
  }
}

export default {
  name: 'Index',
  components: {
    IconSvg
  },
  data() {
    return {
      menus,
      apps
    }
  },
  mounted() {
    const scroll = $('#scroll')
    on(scroll, 'mousewheel', (e) => {
      scroll.scrollLeft += e.deltaY / 2
      e.preventDefault()
    })
  },
  methods: {
    handleMenu(key) {
      if (key !== 'setting') {
        ipcRenderer.send(`mtools:${key}`)
      }
    },
    handleApp(key) {
      console.log(isExist('/Temp'))
      console.log('打开应用', key)
    }
  }
}
</script>
