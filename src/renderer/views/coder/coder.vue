<template>
  <div class="coder-app no-drag">
    <div class="database-container">
      <div class="header">
        <el-input v-model="query.name" size="small" />
      </div>
      <vue-scroll :ops="{ bar: { background: '#c1c1c1', size: '8px' } }">
        <ul class="database-list">
          <li v-for="(db, i) in databases" :key="i">
            <span class="switcher inline-center" @click="toggleShowTables(db)">
              <icon-svg :type="db.open ? 'caret-down' : 'caret-right'" />
            </span>
            <span class="content-wrapper" @click="toggleShowTables(db)" @dblclick="toggleShowTables(db)">
              <span class="db-icon inline-center"><icon-svg type="database" /></span>
              <span class="content-title" :title="db['databaseId']" v-html="db['databaseId']" />
            </span>
            <ul v-if="db.open" class="table-list">
              <li v-for="(table, j) in db['tables']" :key="j">
                <span class="content-wrapper" @click="handleSelectTable(db, table)">
                  <input v-model="table['checked']" type="checkbox" class="checkbox">
                  <span class="table-icon inline-center"><icon-svg type="table" /></span>
                  <span class="title" :title="table['tableName']" v-html="table['tableName']" />
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </vue-scroll>
    </div>
    <div class="coder-config-container">
      <el-form ref="config" :model="config" size="medium" label-width="120px">
        <el-form-item label="数据库">
          <el-select v-model="config.databaseId" placeholder="请选择">
            <el-option
              v-for="item in databases"
              :key="item['databaseId']"
              :label="item['databaseId']"
              :value="item['databaseId']"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="数据表">
          <el-select v-model="config.tables" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="包名">
          <el-input v-model="config.package" />
        </el-form-item>
        <el-form-item label="生成位置">
          <el-input v-model="config.package" />
          <el-button type="primary" @click="handleChoosePath()">选择文件夹</el-button>
        </el-form-item>
        <el-form-item label="其他配置">
          <div class="options-grid">
            <div>
              <el-checkbox v-model="config.cover">覆盖已存在文件</el-checkbox>
            </div>
            <div>
              <el-checkbox v-model="config.useParent">使用父类</el-checkbox>
            </div>
            <div>
              <el-checkbox v-model="config.genFrontEnd">生成前端代码</el-checkbox>
              <el-checkbox v-model="config.useCommentAsLabel">使用字段注释做前端标签值</el-checkbox>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import VueScroll from 'vuescroll'
import IconSvg from '@/components/IconSvg/index'

import { CHOOSE_FOLDER } from '#/constant'
import { msgHandler } from '@/utils/events'
import { getTableList } from '@/api/database'

export default {
  name: 'Index',
  components: {
    VueScroll,
    IconSvg
  },
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
        output: null,
        cover: false,
        useParent: true,
        genFrontEnd: false,
        useCommentAsLabel: false
      }
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    getTableList() {
      getTableList().then(response => {
        const { success, data } = response
        if (success) {
          this.databases = data
        }
      })
    },
    toggleShowTables(db) {
      db['open'] = !db['open']
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
      msgHandler(CHOOSE_FOLDER).then(response => {
        this.config.output = response
      })
    }
  }
}
</script>
