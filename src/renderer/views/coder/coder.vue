<template>
  <div class="coder-app no-drag">
    <div class="database-container">
      <div class="header">
        头部
      </div>
      <div class="database-tree">
        <ul>
          <li />
        </ul>
      </div>
    </div>
    <div class="coder-config-container">
      <div @click="testConnect">测试数据库连接</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Index',
  created() {
  },
  methods: {
    getConfig() {

    },
    testConnect() {
    }
  }
}
</script>
<style lang="less">
.coder-app {
  width: 100%;
  height: 100%;
  display: flex;

  .database-container {
    width: 25%;

  }

  .coder-config-container {
    width: 75%;
  }
}
</style>
