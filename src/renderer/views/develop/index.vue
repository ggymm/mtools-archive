<template>
  <div class="develop-app">
    <el-tabs>
      <el-tab-pane label="时间戳工具">
        <timestamp />
      </el-tab-pane>
      <el-tab-pane label="加密解密工具">
        加密解密工具
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Timestamp from './timestamp'

export default {
  name: 'Develop',
  components: {
    Timestamp
  },
  data() {
    return {

    }
  }
}
</script>
