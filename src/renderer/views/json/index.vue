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
        @click="editorFormVisible = !editorFormVisible"
      >
        {{ editorFormVisible ? "隐藏" : "显示" }}右侧树视图
      </el-button>
    </div>
    <div class="json-editor">
      <div v-show="editorCodeVisible" class="json-code">
        <div ref="jsoneditorCode" class="jsoneditor-container" />
      </div>
      <div v-show="editorFormVisible" class="json-form">
        <div ref="jsoneditorForm" class="jsoneditor-container" />
      </div>
    </div>
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
      editorForm: null,
      editorFormVisible: true
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
      if (!this.editorForm) {
        const container = this.$refs.jsoneditorForm
        this.editorForm = new JSONEditor(container, {
          mode: 'form'
        })
      }
    },
    handleCodeToView() {
      this.editorForm.set(this.editorCode.get())
    },
    handleCodeToJava() {

    },
    handleCodeToJavaScript() {

    }
  }
}
</script>
<style lang="less">
.json-box-app {
  width: 100%;
  height: 100%;

  .jsoneditor-undo, .jsoneditor-redo, .jsoneditor-poweredBy {
    display: none;
  }

  .handler {
    height: 48px;
    display: flex;
    align-items: center;
    padding: 8px 24px;
  }

  .json-editor {
    display: flex;
    flex-grow: 1;
    padding: 0 12px 12px;

    .json-code, .json-form {
      display: flex;
      flex: 1;
      padding: 0 12px;
    }

    .jsoneditor-container {
      width: 100%;
      height: calc(100vh - 76px);
    }
  }
}

</style>
