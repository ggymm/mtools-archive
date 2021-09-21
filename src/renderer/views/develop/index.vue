<template>
  <div class="develop-app">
    <el-tabs>
      <el-tab-pane label="时间戳工具">
        <timestamp />
      </el-tab-pane>
      <el-tab-pane label="字符串编解码">
        <codec />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Timestamp from './timestamp'
import Codec from './codec'

export default {
  name: 'Develop',
  components: {
    Timestamp,
    Codec
  },
  data() {
    return {

    }
  }
}
</script>
