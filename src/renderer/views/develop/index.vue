<template>
  <div class="develop-app">
    <el-tabs>
      <el-tab-pane label="时间戳工具">
        <timestamp />
      </el-tab-pane>
      <el-tab-pane label="字符串编解码">
        <codec />
      </el-tab-pane>
      <el-tab-pane label="进制转换">
        <hex />
      </el-tab-pane>
      <el-tab-pane label="字节转换">
        <byte />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Timestamp from './timestamp'
import Codec from './codec'
import Hex from './hex'
import Byte from './byte'

export default {
  name: 'Develop',
  components: {
    Timestamp,
    Codec,
    Hex,
    Byte
  },
  data() {
    return {
    }
  }
}
</script>
<style lang="less">
.develop-app {
  width: 100vw;
  height: 100vh;
  display: flex;

  .el-tabs {
    width: 100%;
    height: 100%;
    padding: 10px 20px;
  }
}
</style>
