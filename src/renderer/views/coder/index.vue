<template>
  <div class="coder-app">
    <el-form ref="config" :model="config" size="medium" label-width="200px">
      <el-form-item label="数据库">
        <el-select v-model="config.databaseId" @change="handleDBChange">
          <el-option
            v-for="item in databases"
            :key="item['id']"
            :label="item['showName']"
            :value="item['id']"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="数据表">
        <el-select v-model="config.tables" filterable multiple>
          <el-option
            v-for="table in tables"
            :key="table['tableName']"
            :label="table['tableName']"
            :value="table['tableName']"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="生成配置">
        <div class="options">
          <div>
            <el-checkbox v-model="config.outputCover">覆盖存在文件</el-checkbox>
          </div>
          <div>
            <el-checkbox v-model="config.useLombok" disabled>使用Lombok</el-checkbox>
            <el-checkbox v-model="config.useParent">使用父类</el-checkbox>
            <el-checkbox v-model="config.autoFill">添加插入/更新自动填充注解</el-checkbox>
          </div>
          <div>
            <el-checkbox v-model="config.useOriginColumn">使用原始表名做包名</el-checkbox>
            <el-checkbox v-model="config.useOriginColumn">使用原始列名做字段</el-checkbox>
          </div>
          <div>
            <el-checkbox v-model="config.autoClassComment">自动生成类注释</el-checkbox>
          </div>
          <div>
            <el-checkbox v-model="config.genFrontEnd">生成前端代码</el-checkbox>
            <el-checkbox v-model="config.useCommentAsLabel">使用字段注释做前端标签值</el-checkbox>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="包名">
        <el-input v-model="config.package" spellcheck="false" />
      </el-form-item>
      <el-form-item v-if="config.useParent" label="父类完整包名">
        <el-input v-model="config.parentPackage" spellcheck="false" />
      </el-form-item>
      <el-form-item v-if="config.autoFill" label="自动填充字段">
        <el-input v-model="config.autoFillColumn" spellcheck="false" />
      </el-form-item>
      <el-form-item label="生成位置">
        <el-input v-model="config.output" spellcheck="false" />
        <el-button type="primary" @click="handleChoosePath()">选择文件夹</el-button>
      </el-form-item>
      <el-form-item class="handler">
        <el-button type="primary">生成代码</el-button>
        <el-button type="primary">保存设置</el-button>
        <el-button type="success">打开生成文件夹</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { CHOOSE_FOLDER } from '#/constant'
import { msgHandler } from '@/utils/events'
import { getDBList, getTableList } from '@/api/database'

export default {
  name: 'Index',
  components: {},
  data() {
    return {
      databases: [],
      tables: [],
      query: {
        name: null
      },
      config: {
        databaseId: null,
        tables: [],
        package: null,
        parentPackage: 'com.ninelock.core.base.BaseEntity',
        output: null,
        outputCover: true,
        useLombok: true,
        useParent: false,
        autoFill: true,
        autoFillColumn: 'create_time,create_id,creator,update_time,update_id,del_flag',
        useOriginTable: false,
        useOriginColumn: false,
        autoClassComment: true,
        genFrontEnd: false,
        useCommentAsLabel: false
      }
    }
  },
  created() {
    this.getDBList()
  },
  methods: {
    getDBList() {
      getDBList().then(response => {
        const { success, data } = response
        if (success) {
          this.databases = data
        }
      })
    },
    handleDBChange(val) {
      const params = {
        databaseId: val
      }
      getTableList(params).then(response => {
        const { success, data } = response
        if (success) {
          this.tables = data
        }
      })
    },
    handleSelectTable(db, table) {
      const { databaseId } = db
      if (this.config.databaseId !== databaseId) {
        this.tables = []
        for (let i = 0, len = this.databases.length; i < len; i++) {
          if (this.databases[i].tables === null) {
            continue
          }
          for (let j = 0; j < this.databases[i].tables.length; j++) {
            this.databases[i].tables[j].checked = false
          }
        }
        this.config.databaseId = databaseId
      }
      const { tableName } = table
      const index = this.tables.indexOf(tableName)
      if (index < 0) {
        table.checked = true
        this.tables.push(tableName)
      } else {
        table.checked = false
        this.tables.splice(index, 1)
      }
    },
    handleChoosePath() {
      const _this = this
      msgHandler(CHOOSE_FOLDER).then((response) => {
        _this.config.output = response
      })
    }
  }
}
</script>
