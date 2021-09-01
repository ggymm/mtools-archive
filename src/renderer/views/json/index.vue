<template>
  <div class="json-box-app">
    <div class="handler">
      <el-button type="primary" size="small" @click="handleCodeToView()">格式化JSON</el-button>
      <el-button type="primary" size="small" @click="handleCodeToJava()">JSON转Java对象</el-button>
      <el-button type="primary" size="small" @click="handleCodeToJavaScript()">JSON转JavaScript对象</el-button>
      <el-button
        type="primary"
        size="small"
        @click="editorCodeVisible = !editorCodeVisible"
      >
        {{ editorCodeVisible ? "隐藏" : "显示" }}左侧代码视图
      </el-button>
      <el-button
        type="primary"
        size="small"
        @click="editorViewVisible = !editorViewVisible"
      >
        {{ editorViewVisible ? "隐藏" : "显示" }}右侧树视图
      </el-button>
    </div>
    <el-row :gutter="10" class="json-editor">
      <el-col :span="12">
        <div v-show="editorCodeVisible" class="json-code">
          <div ref="jsoneditorCode" class="jsoneditor-container" />
        </div>
      </el-col>
      <el-col :span="12">
        <div v-show="editorViewVisible" class="json-view">
          <div ref="jsoneditorView" class="jsoneditor-container" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import JSONEditor from 'jsoneditor/dist/jsoneditor.min.js'
import 'jsoneditor/dist/jsoneditor.min.css'

export default {
  name: 'Index',
  data() {
    return {
      editorCode: null,
      editorCodeVisible: true,
      editorView: null,
      editorViewVisible: true
    }
  },
  mounted() {
    this.initView()
  },
  methods: {
    initView() {
      if (!this.editorCode) {
        const container = this.$refs.jsoneditorCode
        this.editorCode = new JSONEditor(container, {
          mode: 'code',
          history: false,
          enableSort: false,
          enableTransform: false
        })
      }
      if (!this.editorView) {
        const container = this.$refs.jsoneditorView
        this.editorView = new JSONEditor(container, {
          mode: 'view'
        })
      }
    },
    handleCodeToView() {
      this.editorView.set(this.editorCode.get())
    },
    handleCodeToJava() {

    },
    handleCodeToJavaScript() {

    }
  }
}
</script>
