<template>
  <div class="index">
    <div class="top-bar">
      <div class="logo">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#toolkit" />
        </svg>
      </div>
      <div class="title">开发工具箱</div>
      <div class="space" />
      <div class="menus">
        <div v-for="menu in menus" :key="menu['key']" class="menu no-drag" @click="handleMenu(menu['key'])">
          <div class="menu-icon">
            <icon-svg class="icon" :type="menu['icon']" />
          </div>
          <span class="menu-title">{{ menu["title"] }}</span>
        </div>
      </div>
    </div>
    <div class="apps-content no-drag">
      <div id="scroll" class="scroll">
        <div v-for="(value, key) in apps" :key="key" class="app" @click="handleOpenApp(key)">
          <div class="app-icon">
            <icon-svg class="icon" :type="value['icon']" />
          </div>
          <div class="app-title">{{ value["title"] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/iconfont.js'
import { $, on } from '@/utils/dom'
import { requireFunc } from '@/utils/require'
import IconSvg from '@/components/IconSvg/index'

const { ipcRenderer } = requireFunc('electron')
// const ipcRenderer = {}

const menus = [
  { key: 'setting', icon: 'setting', title: '设置' },
  { key: 'minimize', icon: 'minimize', title: '最小化' },
  { key: 'hide', icon: 'hide', title: '隐藏' },
  { key: 'exit', icon: 'exit', title: '退出' }
]
const apps = {
  coder: {
    icon: 'coder',
    title: '代码生成器',
    window: {
      width: 1000,
      height: 750,
      frame: true
    }
  },
  magnet: {
    icon: 'magnet',
    title: '磁力链接搜索',
    window: {
      width: 800,
      height: 600,
      frame: true
    }
  },
  json: {
    icon: 'coder',
    title: 'JSON工具集',
    window: {
      width: 800,
      height: 600,
      frame: true
    }
  },
  android: {
    icon: 'android',
    title: 'Android工具集',
    window: {
      width: 800,
      height: 600,
      frame: true
    }
  },
  video: {
    icon: 'video',
    title: '音视频工具箱',
    window: {
      width: 800,
      height: 600,
      frame: true
    }
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
    handleOpenApp(key) {
      const { title, window } = apps[key]

      ipcRenderer.send(`mtools:open-app`, {
        title: title,
        path: key, frame: window.frame,
        width: window.width, height: window.height
      })
    }
  }
}
</script>
