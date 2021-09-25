<template>
  <div class="hex-app">
    <el-form size="medium" label-width="120px">
      <el-form-item label="二进制">
        <el-input v-model="binary" />
        <el-button type="primary" @click="handleBinary">转换</el-button>
      </el-form-item>
      <el-form-item label="十进制">
        <el-input v-model="decimal" />
        <el-button type="primary" @click="handleDecimal">转换</el-button>
      </el-form-item>
      <el-form-item label="十六进制">
        <el-input v-model="hexadecimal" />
        <el-button type="primary" @click="handleHexadecimal">转换</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Hex',
  data() {
    return {
      binary: null,
      decimal: null,
      hexadecimal: null
    }
  },
  methods: {
    handleBinary() {
      if (this.binary) {
        this.decimal = parseInt(this.binary, 2)
        this.hexadecimal = this.decimal.toString(16)
      }
    },
    handleDecimal() {
      if (this.decimal) {
        this.binary = parseInt(this.decimal).toString(2)
        this.hexadecimal = parseInt(this.decimal).toString(16)
      }
    },
    handleHexadecimal() {
      if (this.hexadecimal) {
        this.binary = parseInt(this.hexadecimal, 16).toString(2)
        this.decimal = parseInt(this.hexadecimal, 16).toString(10)
      }
    }
  }
}
</script>

<style lang="less">
.hex-app {
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
