<template>
  <div class="byte-app">
    <el-form size="medium" label-width="120px">
      <el-form-item>
        <el-button type="primary" @click="clean">清空</el-button>
      </el-form-item>
      <el-form-item label="字节（Byte）">
        <el-input v-model="data[0]" />
        <el-button type="primary" @click="formatByte(0)">转换</el-button>
      </el-form-item>
      <el-form-item label="千字节（KB）">
        <el-input v-model="data[1]" />
        <el-button type="primary" @click="formatByte(1)">转换</el-button>
      </el-form-item>
      <el-form-item label="兆字节（MB）">
        <el-input v-model="data[2]" />
        <el-button type="primary" @click="formatByte(2)">转换</el-button>
      </el-form-item>
      <el-form-item label="吉字节（GB）">
        <el-input v-model="data[3]" />
        <el-button type="primary" @click="formatByte(3)">转换</el-button>
      </el-form-item>
      <el-form-item label="太字节（TB）">
        <el-input v-model="data[4]" />
        <el-button type="primary" @click="formatByte(4)">转换</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Byte',
  data() {
    return {
      data: []
    }
  },
  methods: {
    clean() {
      this.data = []
    },
    formatByte(index) {
      for (let i = 0; i < index; i++) {
        this.$set(this.data,
          i,
          this.data[index] * Math.pow(1024, index - i))
      }
      for (let i = index + 1; i < 5; i++) {
        this.$set(this.data,
          i,
          parseFloat((this.data[index] / Math.pow(1024, i - index)).toFixed(3)))
      }
    }
  }
}
</script>
<style lang="less">
.byte-app {
  padding-right: 80px;

  .el-form {
    flex: 1;

    .el-form-item__content {
      display: flex;
    }

    .el-button {
      margin-left: 16px;
    }
  }
}
</style>
