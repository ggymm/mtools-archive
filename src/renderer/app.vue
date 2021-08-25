<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style lang="less">
html, body {
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
}

ul, li {
  list-style: none;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.1em;
  fill: currentColor;
  overflow: hidden;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: none;
  color: #606266;
  background-color: #ffffff;
  -webkit-app-region: drag;
}

.no-drag {
  -webkit-app-region: no-drag;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
