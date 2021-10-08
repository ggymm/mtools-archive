<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import '@/assets/iconfont.js'
import '@/assets/iconpark.js'
import { off, on } from '@/utils/dom'
import { msgSender } from '@/utils/events'

export default {
  name: 'App',
  created() {
    on(document, 'keydown', this.keydown)
  },
  beforeDestroy() {
    off(document, 'keydown', this.keydown)
  },
  methods: {
    keydown(event) {
      if (event.key === 'F12') {
        event.preventDefault()
        msgSender('mtools:toggle-devtools-app')
        return false
      }
    }
  }
}
</script>
