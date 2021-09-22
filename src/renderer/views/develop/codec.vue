<template>
  <div class="codec-app">
    <el-row>
      <el-col :span="24">
        <el-input v-model="input" type="textarea" :rows="row" spellcheck="false" />
      </el-col>
    </el-row>
    <el-row style="padding: 12px 0">
      <el-select v-model="type" style="margin-right: 10px">
        <el-option label="Base64编码" value="base64" />
        <el-option label="URL编码" value="url" />
      </el-select>
      <el-button type="primary" @click="encode">编码</el-button>
      <el-button type="primary" @click="decode">解码</el-button>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-input v-model="output" type="textarea" :rows="row" spellcheck="false" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Base64 } from 'js-base64'

export default {
  name: 'Codec',
  data() {
    return {
      row: 5,
      type: 'base64',
      input: null,
      output: null
    }
  },
  mounted() {
    this.autoStyle()
    window.onresize = () => {
      return (() => {
        this.autoStyle()
      })()
    }
  },
  methods: {
    autoStyle() {
      // 20 - 40 - 24 - 64 - 44
      this.row = Math.floor((window.innerHeight - 192) / 2 / 20)
    },
    encode() {
      switch (this.type) {
        case 'base64':
          this.output = Base64.encode(this.input)
          break
        case 'url':
          this.output = encodeURI(this.input)
          break
      }
    },
    decode() {
      switch (this.type) {
        case 'base64':
          this.input = Base64.decode(this.output)
          break
        case 'url':
          this.input = decodeURI(this.output)
          break
      }
    }
  }
}
</script>

<style lang="less">
.codec-app {
  .el-textarea__inner {
    line-height: 20px;
  }
}
</style>
